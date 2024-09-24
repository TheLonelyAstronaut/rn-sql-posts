import { useCallback, useRef, useState } from "react";
import { useSession } from "../utils/context";
import { regexp } from "@/core";

type HandlerType = "email" | "password" | "username";

export const useAuthScreenViewModel = () => {
  const { signIn: contextSignIn } = useSession();
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

  const signIn = useCallback(() => {
    setLoading(true);

    contextSignIn();
  }, []);

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
