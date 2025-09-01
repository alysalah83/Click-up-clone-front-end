import z from "zod";
import { regex } from "zod/v4";

const emailSchema = z
  .email({
    message: "invalid email, please enter a valid email",
  })
  .max(100, { message: "too long email, enter a valid email" });

const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: "password must be greater or equal than 8 length" })
  .max(50, { message: "password max length must be less than or equal 50" });

const nameSchema = z
  .string()
  .trim()
  .min(2, { error: "please enter your full name" })
  .max(50, "too long name");
regex(/^[a-zA-Z0-9_]{3,16}$/, { error: "enter a vialed name" });

const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export { signupSchema, loginSchema };
