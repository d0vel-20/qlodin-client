import { ServiceResponse } from "../types";
import { __cookies } from "./cookies";

export const AuthRequest = {
  get: async (url: string) => {
    return await appServerFetch(url, {});
  },
  post(url: string, body: any) {
    return appServerFetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  patch(url: string, body: any) {
    return appServerFetch(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },
};

export async function appServerFetch<T = any>(
  url: string,
  init: RequestInit
): Promise<ServiceResponse<T>> {
  try {
    const token = getCookie(__cookies.user_token);
    if (!token) window.location.href = "/login";

    const req = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...init.headers,
      },
    });
    console.log(
      "\n\nREQUEST: ",
      req.url,
      req.status,
      "body: ",
      init.body,
      "\n\n"
    );

    const data = await req.json();
    if (data) return [data, null];
    return [null, false];
  } catch (error) {
    return [null, error];
  }
}

export function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null; // Return the value of the cookie or null if not found
}
