import { signupUser, getUser, loginUser, signupGuest } from "../api/auth";

export const authServices = {
  signupUser,
  signupGuest,
  loginUser,
  getUser,
};
