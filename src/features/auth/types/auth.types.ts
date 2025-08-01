import z from "zod";
import { loginSchema, signupSchema } from "../validations/authSchemas";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface ClientUser {
  id: string;
  name: string;
  email: string;
}

interface Session {
  user: User;
  token: string;
}

type ClientLoginData = z.infer<typeof loginSchema>;
type ClientSignupData = z.infer<typeof signupSchema>;

export type { User, Session, ClientLoginData, ClientSignupData, ClientUser };
