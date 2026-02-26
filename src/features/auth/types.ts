import z from "zod";
import { loginSchema, signupUserSchema } from "./schema/authSchemas";
import { User } from "@/../../../Back-end/src/generated/prisma/client";

type UserWithoutPassword = Omit<User, "password">;

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
