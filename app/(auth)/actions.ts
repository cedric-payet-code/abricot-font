"use server";

import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import { createSession, deleteSession } from "@/lib/session";

export type AuthFormState =
  | {
      error?: string;
      fieldErrors?: Record<string, string>;
      values?: { name?: string; email?: string };
    }
  | undefined;

const SERVER_ERROR = "Le serveur est injoignable. Réessayez plus tard.";

function toFieldErrors(details?: { field: string; message: string }[]) {
  if (!details?.length) return undefined;
  return Object.fromEntries(details.map((d) => [d.field, d.message]));
}

export async function login(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const values = { email };

  if (!email || !password) {
    return { error: "Veuillez renseigner votre email et votre mot de passe.", values };
  }

  let result;
  try {
    result = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return { error: SERVER_ERROR, values };
  }

  if (!result.success) {
    return { error: "Email ou mot de passe incorrect.", values };
  }

  await createSession(result.data.token);
  redirect("/dashboard");
}

export async function register(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const values = { name, email };

  if (!name || !email || !password) {
    return { error: "Veuillez remplir tous les champs.", values };
  }

  let result;
  try {
    result = await api("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  } catch {
    return { error: SERVER_ERROR, values };
  }

  if (!result.success) {
    return {
      error: result.message ?? "L'inscription a échoué.",
      fieldErrors: toFieldErrors(result.data?.errors),
      values,
    };
  }

  await createSession(result.data.token);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
