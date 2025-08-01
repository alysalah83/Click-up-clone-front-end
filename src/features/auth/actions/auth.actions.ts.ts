"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, RedirectType } from "next/navigation";
import { ClientLoginData, ClientSignupData } from "../types/auth.types";
import { loginSchema, signupSchema } from "../validations/authSchemas";
import { signupUserApi } from "@/lib/api/server/auth/signupUser";
import { loginUserApi } from "@/lib/api/server/auth/logUser";
import { cookies } from "next/headers";

export async function signupUser(signupData: ClientSignupData) {
  try {
    const vialedSignupData = signupSchema.parse(signupData);
    await signupUserApi(vialedSignupData);
  } catch (err: any) {
    console.log(err);
    return err.message || "Something went wrong";
  }
  redirect("/home/board", RedirectType.replace);
}

export async function loginUser(loginData: ClientLoginData) {
  try {
    const vialedLoginData = loginSchema.parse(loginData);
    await loginUserApi(vialedLoginData);
  } catch (err: any) {
    console.log(err);
    return err.message || "Something went wrong";
  }
  redirect("/home/board", RedirectType.replace);
}

export async function signOutUser() {
  (await cookies()).delete("auth-token");

  redirect("/login", RedirectType.replace);
}
