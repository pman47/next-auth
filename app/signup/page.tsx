import { User } from "@/models/userModel";
import Link from "next/link";
import { FC } from "react";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { connectToDB } from "@/lib/utils";

interface SignUpProps {}

const SignUp: FC<SignUpProps> = ({}) => {
  const signUp = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!name || !email || !password) {
      throw new Error("Please provide all details.");
    }

    await connectToDB();

    const user = await User.findOne({
      email: email,
    });

    if (user) throw new Error("User already exists with the provided email.");

    const hashedPassword = await hash(password, 10);

    // Create user
    await User.create({
      email,
      name,
      password: hashedPassword,
    });

    redirect("/login");
  };

  return (
    <div className="flex items-center justify-center h-dvh flex-col gap-3">
      <h2 className="text-xl font-extrabold">SignUp Here</h2>
      <form action={signUp} className="flex flex-col gap-2">
        <input
          name="name"
          type="text"
          placeholder="Enter name..."
          className="p-4 rounded"
          required
        />
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
          SignUp
        </button>
      </form>
      <Link href={"/login"} className="text-blue-500">
        Already have account? Login
      </Link>
    </div>
  );
};

export default SignUp;
