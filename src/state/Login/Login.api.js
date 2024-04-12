import { API } from "@/axios/api";
import instance from "@/axios/instance";
import { setItem } from "@/utility/localStorageControl";

export const LoginCall = async (body) => {
  const response = await instance.post(API.auth.login, body);
  if (!response.data.data.error) return response.data.data;
  else {
    return null;
  }
};
