import Link from "next/link";
import { FC } from "react";
import LoginForm from "../Components/form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface LoginProps {}

const Login: FC<LoginProps> = async () => {
  const session = await auth();

  if (session?.user) redirect("/");

  return (
    <div className="flex items-center justify-center h-dvh flex-col gap-3">
      <h2 className="text-xl font-extrabold">Login Here</h2>
      <LoginForm />
      <Link href={"/signup"} className="text-blue-500">
        Don't have an account? Sign Up
      </Link>
    </div>
  );
};

export default Login;
