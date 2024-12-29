import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { LoginForm } from "./form";

export default async function Page() {
  const { isSignedIn } = await auth();

  if (isSignedIn) {
    return redirect("/");
  }

  return <LoginForm />;
}
