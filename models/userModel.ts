import mongoose, { InferSchemaType, model, models } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
});

type User = InferSchemaType<typeof userSchema>;

// Check if the model already exists before defining it
export const User = models?.User || model<User>("User", userSchema);
