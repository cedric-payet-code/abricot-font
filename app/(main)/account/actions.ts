"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import { getCurrentUser } from "@/lib/user";
import { EMAIL_RULE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from "@/lib/validation";

export type AccountFormState =
  | {
      success?: string;
      error?: string;
      passwordChanged?: boolean;
      fieldErrors?: Record<string, string>;
    }
  | undefined;

const SERVER_ERROR = "Le serveur est injoignable. Réessayez plus tard.";

function toFieldErrors(errors?: { field: string; message: string }[]) {
  if (!errors?.length) return undefined;
  return Object.fromEntries(
    errors.map((e) => [e.field === "name" ? "firstName" : e.field, e.message])
  );
}

export async function updateAccount(
  _prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const name = [firstName, lastName].filter(Boolean).join(" ");

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2)
    fieldErrors.firstName = "Le prénom et le nom doivent faire au moins 2 caractères.";
  if (!email) fieldErrors.email = "L'email est requis.";
  else if (!EMAIL_RULE.test(email)) fieldErrors.email = "Format d'email invalide.";
  if (newPassword && !currentPassword) {
    fieldErrors.currentPassword = "Saisissez votre mot de passe actuel.";
  }
  if (newPassword && !PASSWORD_RULE.test(newPassword)) {
    fieldErrors.newPassword = PASSWORD_RULE_MESSAGE;
  }
  if (currentPassword && !newPassword) {
    fieldErrors.newPassword = "Saisissez le nouveau mot de passe.";
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { error: "Certains champs sont invalides.", fieldErrors };
  }

  const user = await getCurrentUser();
  const profileChanged = name !== user?.name || email.toLowerCase() !== user?.email.toLowerCase();

  if (!profileChanged && !newPassword) {
    return { error: "Aucune modification à enregistrer." };
  }

  let passwordChanged = false;

  try {
    if (newPassword) {
      const result = await api("/auth/password", {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!result.success) {
        if (result.error === "INVALID_CURRENT_PASSWORD") {
          return {
            error: "Le mot de passe n'a pas été modifié.",
            fieldErrors: { currentPassword: "Mot de passe actuel incorrect." },
          };
        }
        return {
          error: result.message ?? "La modification du mot de passe a échoué.",
          fieldErrors: toFieldErrors(result.data?.errors),
        };
      }
      passwordChanged = true;
    }

    if (profileChanged) {
      const result = await api("/auth/profile", {
        method: "PUT",
        body: JSON.stringify({ name, email }),
      });
      if (!result.success) {
        const error = passwordChanged
          ? "Votre mot de passe a été modifié, mais pas vos informations."
          : "Vos informations n'ont pas été modifiées.";
        if (result.error === "EMAIL_ALREADY_EXISTS") {
          return { error, passwordChanged, fieldErrors: { email: "Cet email est déjà utilisé." } };
        }
        return {
          error: passwordChanged ? error : (result.message ?? error),
          passwordChanged,
          fieldErrors: toFieldErrors(result.data?.errors),
        };
      }
    }
  } catch {
    return { error: SERVER_ERROR };
  }

  revalidatePath("/", "layout");
  return { success: "Vos informations ont été mises à jour." };
}
