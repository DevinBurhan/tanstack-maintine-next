import { API } from "@/axios/api";
import instance from "@/axios/instance";

export const getDummyJsonAPI = async (page) => {
  const response = await instance.get("products");
  return response.data;
};
