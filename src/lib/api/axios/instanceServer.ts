import axios from "axios";
import { getToken } from "../utils/helper";

const api = axios.create({
  baseURL: process.env.API_URL,
});

const apiTakeToken = (token: string) => {
  return axios.create({
    baseURL: process.env.API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const apiWithToken = async () => {
  const token = await getToken();
  return apiTakeToken(token);
};

export { api, apiTakeToken, apiWithToken };
