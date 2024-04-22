import { API } from "@/axios/api";
import instance from "@/axios/instance";
import { setItem } from "@/utility/localStorageControl";
import { Alert } from "@mantine/core";

export const LoginCall = async (body) => {
  const response = await instance.post(API.auth.login, body);
  console.log("🚀 ~ LoginCall ~ response:", response);
  alert(response.data.message);
  if (!response.data.data.error) return response.data.data;
  else {
    return null;
  }
};
