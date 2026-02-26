import { LoginInputs, SignupUserInputs, UserWithoutPassword } from "../types";
import { Session } from "../types";
import { axiosClient } from "@/shared/lib/axios/client";

export const signupUser = async (signupUserInputs: SignupUserInputs) => {
  return await axiosClient.post<Session>(
    "/users/register/user",
    signupUserInputs,
  );
};

export const signupGuest = async () => {
  return await axiosClient.post<Session>("/users/register/guest");
};

export async function getUser() {
  return await axiosClient.get<UserWithoutPassword>("/users");
}

export const loginUser = async function (loginInputs: LoginInputs) {
  return await axiosClient.post<Session>("/users/login", loginInputs);
};
