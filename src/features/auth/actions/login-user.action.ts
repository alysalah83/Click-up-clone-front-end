"use server";

import { setToken } from "@/shared/lib/cookies/setToken";
import { loginSchema } from "../schema/authSchemas";
import { authServices } from "../services/auth.service";
import { LoginInputs } from "../types";
import { redirect, RedirectType } from "next/navigation";
import { formatActionError } from "@/shared/lib/utils/formatActionError";

export async function loginUser(loginInputs: LoginInputs) {
  try {
    const userInputs = loginSchema.parse(loginInputs);
    const { token } = await authServices.loginUser(userInputs);
    await setToken(token);
  } catch (error) {
    return { status: "error" as const, error: formatActionError(error) };
  }
  redirect("/home/board", RedirectType.replace);
}
