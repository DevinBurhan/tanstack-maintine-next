"use server";

import { cookies } from "next/headers";

export async function setCookie(data) {
  cookies().set("name", "lee");
  // or
  cookies().set("name", "lee", { secure: true });
  // or
  cookies().set({
    name: "name",
    value: "lee",
    httpOnly: true,
    path: "/",
  });
}
