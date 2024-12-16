import { ServiceResponse } from "../types";

export const ClientRequest = {
  get: async (url: string) => {
    return await appFetch(url, {
    });
  },
  post(url: string, body: any) {
    return appFetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  patch(url: string, body: any) {
    return appFetch(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },
};

export async function appFetch<T = any>(
  url: string,
  init: RequestInit
): Promise<ServiceResponse<T>> {
  try {
    const req = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      }
    });
    console.log("\n\nREQUEST: ", req.url, req.status, "body: ", init.body, "\n\n");

    const data = await req.json();
    if (data) return [data, null];
    return [null, false];
  } catch (error) {
    return [null, error];
  }
}
