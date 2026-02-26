import z from "zod";
import { loginSchema, signupUserSchema } from "./schema/authSchemas";

type UserWithoutPassword = Omit<User, "password">;

interface User {
  name: string | null;
  id: string;
  role: "guest" | "user";
  email: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Session {
  user: UserWithoutPassword;
  token: string;
}

type LoginInputs = z.infer<typeof loginSchema>;
type SignupUserInputs = z.infer<typeof signupUserSchema>;

export type {
  UserWithoutPassword,
  User,
  Session,
  LoginInputs,
  SignupUserInputs,
};
