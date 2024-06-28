"use client";

import { FC } from "react";
import { login } from "../actions/login";
import { redirect, useRouter } from "next/navigation";

interface formProps {}

const LoginForm: FC<formProps> = ({}) => {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
          alert("Please provide all details.");
          return;
        }
        const error = await login(email, password);
        if (!error) {
          alert("Login Successful");
          router.refresh();
        } else alert(error);
      }}
      className="flex flex-col gap-2"
    >
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
  );
};

export default LoginForm;
