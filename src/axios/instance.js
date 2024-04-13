// services/api.js
import { getCookie } from "@/utility/getCookie";
import { getItem, removeItem } from "@/utility/localStorageControl";
// import { Alert } from "@mantine/core";
// import { IconInfoCircle } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { getSession } from "next-auth/react";
import secureLocalStorage from "react-secure-storage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    // Authorization: `Bearer ${getItem("access_token")}`,
    // "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use(
  async (config) => {
    const user = await getItem("rememberedUser");
    const localeLanguage = await getCookie("lang");
    const nextLocal = await getCookie("NEXT_LOCALE");
    // console.log("nextLocal", nextLocal);
    let lang;
    // if (
    //   localeLanguage &&
    //   localeLanguage !== undefined &&
    //   localeLanguage !== "undefined"
    // ) {
    //   lang = await JSON.parse(localeLanguage);
    // } else {
    //   lang = "en";
    // }
    // if (config && config.headers && lang) {
    //   {
    //     config.headers["languagecode"] = `${lang}`;
    //   }
    // }
    // if (config && config.params) {
    //   config.params["languageStrictMode"] = true;
    // } else {
    //   config.params = { languageStrictMode: true };
    // }

    const getCookieValue = await getCookie("rememberedUser");
    if (getCookieValue) {
      console.log(getCookieValue);
      const parseCookie = await JSON.parse(getCookieValue);
      config.headers.Authorization = `Bearer ${parseCookie?.token}`;
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
        // message.error(error?.message);
        Cookies.remove("rememberedUser");
        secureLocalStorage.clear();
        removeItem("rememberedUser");
        // window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
