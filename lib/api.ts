import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/session";

export const SESSION_EXPIRED = "Authentication failed";

// Point d'entrée unique vers le back-end, côté serveur : ajoute le token et renvoie toujours un objet
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

  try {
    return { ...(await res.json()), status: res.status };
  } catch {
    return {
      success: false,
      status: res.status,
      error: "SERVER_ERROR",
      message: "Le serveur a rencontré une erreur. Réessayez plus tard.",
    };
  }
}
