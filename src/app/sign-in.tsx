import { AuthScreen, useSession } from "@/features/auth";
import { Redirect } from "expo-router";

export default function SignIn() {
  const { session } = useSession();

  if (session) return <Redirect href="/" />;

  return <AuthScreen />;
}
