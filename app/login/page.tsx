import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import Link from "next/link";
import { FC } from "react";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const login = async (formData: FormData) => {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      throw new Error("Please provide all details.");
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/",
      });
    } catch (error) {
      const err = error as CredentialsSignin;
      return err.message;
    }
  };

  return (
    <div className="flex items-center justify-center h-dvh flex-col gap-3">
      <h2 className="text-xl font-extrabold">Login Here</h2>
      <form action={login} className="flex flex-col gap-2">
        <input
          name="email"
          type="email"
          placeholder="Enter email..."
          className="p-4 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="p-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 px-5 py-2 rounded m-auto text-white"
        >
          Login
        </button>
      </form>
      <Link href={"/signup"} className="text-blue-500">
        Don't have an account? Sign Up
      </Link>
    </div>
  );
};

export default Login;
