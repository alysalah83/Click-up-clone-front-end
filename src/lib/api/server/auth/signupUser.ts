/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientSignupData, Session } from "@/features/auth/types/auth.types";
import { api } from "../../axios/instanceServer";
import { setToken } from "../../utils/helper";

export const signupUserApi = async (signupData: ClientSignupData) => {
  try {
    const res = await api.post("/users/register", signupData);
    const session = res.data as Session;

    if (!session.token)
      throw new Error("something went wrong while creating account");

    await setToken(res.data.token);

    return session;
  } catch (err: any) {
    console.log("Create user error:", err);
    throw new Error(err.response?.data?.message || "Failed to create user");
  }
};
