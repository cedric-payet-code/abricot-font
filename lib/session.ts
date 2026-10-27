import { cookies } from "next/headers";

export const SESSION_COOKIE = "token";

const MAX_AGE = 60 * 60 * 24 * 7;

// Cookie httpOnly : le token JWT n'est jamais accessible au JavaScript du navigateur
export async function createSession(token: string) {
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
