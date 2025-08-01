import { cookies } from "next/headers";

const setToken = async (token: string) => {
  const cookiesStore = await cookies();
  cookiesStore.set("auth-token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
};

const getToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return token;
};

export { setToken, getToken };
