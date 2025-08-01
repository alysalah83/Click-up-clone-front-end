import { AxiosError } from "axios";
import { ClientUser } from "@/features/auth/types/auth.types";
import { apiWithToken } from "../../axios/instanceServer";

export async function getUserApi() {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.get<ClientUser>("/users");
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) throw new Error(error.message);
    if (error instanceof Error) throw new Error(error.message);
  }
}
