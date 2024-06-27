import NextAuth, { CredentialsSignin } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { User } from "./models/userModel";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      name: "My App Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        console.log(email, password);

        if (!email || !password) {
          throw new CredentialsSignin(
            "Please provide email and password both.",
            {
              cause: "Please provide email and password both.",
            }
          );
        }

        // Connection with DB.

        const user = await User.findOne({ email: email }).select("+password");

        if (!user || !user?.password) {
          throw new CredentialsSignin("Invalid email or password.", {
            cause: "Invalid email or password.",
          });
        }

        const isMatch = user.password === password;

        if (!isMatch) {
          throw new CredentialsSignin("Invalid email or password.", {
            cause: "Invalid email or password.",
          });
        }

        delete user.password;

        return user;
      },
    }),
  ],
});
