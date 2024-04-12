// services/api.js
import axios from "axios";
import { getSession } from "next-auth/react";
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_ENDPOINT, // Replace with your API base URL
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
});

api.interceptors.request.use(
  async (config) => {
    // if (config && config.headers) {
    //   {
    //     config.headers["languagecode"] =
    //       getItem("languagecode") === null ? "en" : getItem("languagecode");
    //   }
    // }
    // if (config && config.params) {
    //   config.params["languageStrictMode"] = true;
    // } else {
    //   config.params = { languageStrictMode: true };
    // }
    const session = await getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error ==>", error);
    if (typeof window !== "undefined") {
      if (
        // window.location.pathname !== "/login" &&
        // window.location.pathname !== "/forget-password" &&
        // window.location.pathname !== "/reset-password" &&
        error.response.status === 404
      ) {
        message.error(error?.message);
        Cookies.remove("rememberedUser");
        secureLocalStorage.clear();
        removeItem("rememberedUser");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
