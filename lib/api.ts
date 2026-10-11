import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/session";

export async function api(path: string, options: RequestInit = {}) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  const res = await fetch(`${process.env.API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: "no-store",
  });

  return res.json();
}
