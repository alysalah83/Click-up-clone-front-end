import {
  signupUser,
  getUser,
  loginUser,
  signupGuest,
} from "../api/auth.server";

export const authServices = {
  signupUser,
  signupGuest,
  loginUser,
  getUser,
};
