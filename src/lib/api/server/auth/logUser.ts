/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../axios/instanceServer";
import { setToken } from "../../utils/helper";
import { Session } from "@/features/auth/types/auth.types";

export const loginUserApi = async function (loginData: {
  email: string;
  password: string;
}) {
  try {
    const res = await api.post<Session>("/users/login", loginData);
    const session = res.data;
    if (!session.token) throw new Error("something went wrong while login");
    await setToken(session.token);
    return session.user;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "couldn't login");
  }
};
