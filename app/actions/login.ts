"use server";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/",
    });
  } catch (err) {
    const error = err as CredentialsSignin;
    const cause = error.cause as Error;
    return cause?.message || "";
  }
};
