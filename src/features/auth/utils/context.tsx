import { useContainerInstance, useKvStorageState } from "@/core";
import { User, UsersRepository } from "@/entities/user";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useMemo,
  useCallback,
  useEffect,
} from "react";

const AuthContext = createContext<{
  signIn: (user: User) => void;
  signOut: () => void;
  session?: User | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export const useSession = () => {
  return useContext(AuthContext);
};

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, session], setSession] = useKvStorageState("session");
  const repo = useContainerInstance(UsersRepository);

  const _user = useMemo(() => {
    if (!session) return null;

    const raw = JSON.parse(session) as User;
    return new User(raw);
  }, [session]);

  const signIn = useCallback((user: User) => {
    setSession(JSON.stringify(user));
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
  }, [setSession]);

  useEffect(() => {
    if (!!_user) {
      repo.getUserById(_user.id).catch(signOut);
    }
  }, [_user, signOut]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session: _user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
