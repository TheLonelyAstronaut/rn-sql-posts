import { useCallback, useRef, useState } from "react";
import { useSession } from "../utils/context";
import { CryptoService, regexp, useContainerInstance } from "@/core";
import { User, UserVerificationStatus, UsersRepository } from "@/entities/user";

type HandlerType = "email" | "password" | "username";

export const useAuthScreenViewModel = () => {
  const { signIn: contextSignIn } = useSession();
  const repo = useContainerInstance(UsersRepository);

  const [isValid, setIsValid] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handlerCache = useRef(
    {} as Record<HandlerType, (data: string) => void>,
  );
  const ref = useRef<Record<HandlerType, string>>({
    email: "",
    password: "",
    username: "",
  });

  const signIn = useCallback(async () => {
    try {
      setLoading(true);

      const passwordHash = await CryptoService.encrypt(ref.current.password);

      const user = new User({
        username: ref.current.username,
        email: ref.current.email,
        passwordHash,
      });

      const status = await repo.verifyUser(user);

      switch (status) {
        case UserVerificationStatus.DataAlreadyExists: {
          alert("Email or username already used in another data pair");
          break;
        }
        case UserVerificationStatus.IncorrectPassword: {
          alert("Incorrect password!");
          break;
        }
        case UserVerificationStatus.NotExist: {
          await repo.createUser(user);
          user.flushPassword();

          contextSignIn(user);
          break;
        }
        default: {
          const user = await repo.getUserById(status as User["id"]);

          contextSignIn(user);
          break;
        }
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }, [contextSignIn]);

  const validateInput = useCallback(() => {
    setIsValid(
      regexp.username.test(ref.current.username) &&
        regexp.email.test(ref.current.email) &&
        regexp.password.test(ref.current.password),
    );
  }, []);

  const createHandler = useCallback(
    (type: HandlerType) => {
      if (!handlerCache.current[type]) {
        handlerCache.current[type] = (data: string) => {
          ref.current[type] = data;

          validateInput();
        };
      }

      return handlerCache.current[type];
    },
    [validateInput],
  );

  return {
    signIn,
    createHandler,
    isValid,
    isLoading,
  };
};
