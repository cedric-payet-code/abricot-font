"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import { getCurrentUser } from "@/lib/user";

export type ProjectFormState =
  | {
      success?: boolean;
      error?: string;
      fieldErrors?: Record<string, string>;
    }
  | undefined;

export type UserSearchResult = {
  id: string;
  email: string;
  name: string;
};

const SERVER_ERROR = "Le serveur est injoignable. Réessayez plus tard.";

function toFieldErrors(errors?: { field: string; message: string }[]) {
  if (!errors?.length) return undefined;
  return Object.fromEntries(errors.map((e) => [e.field, e.message]));
}

function readProjectForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
  };
}

function validate({ name, description }: { name: string; description: string }) {
  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Le titre est requis.";
  if (!description) fieldErrors.description = "La description est requise.";
  if (Object.keys(fieldErrors).length === 0) return undefined;
  return { error: "Veuillez remplir les champs obligatoires.", fieldErrors };
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const { name, description } = readProjectForm(formData);
  const contributors = formData.getAll("contributors").map(String);

  const invalid = validate({ name, description });
  if (invalid) return invalid;

  let projectId: string | undefined;

  try {
    const result = await api("/projects", {
      method: "POST",
      body: JSON.stringify({ name, description, contributors }),
    });

    if (!result.success) {
      return {
        error: result.message ?? "La création du projet a échoué.",
        fieldErrors: toFieldErrors(result.data?.errors),
      };
    }
    projectId = result.data?.project?.id;
  } catch {
    return { error: SERVER_ERROR };
  }

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  redirect(projectId ? `/projects/${projectId}` : "/projects");
}

export async function updateProject(
  projectId: string,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const { name, description } = readProjectForm(formData);

  const invalid = validate({ name, description });
  if (invalid) return invalid;

  try {
    const result = await api(`/projects/${projectId}`, {
      method: "PUT",
      body: JSON.stringify({ name, description }),
    });

    if (!result.success) {
      return {
        error: result.message ?? "La modification du projet a échoué.",
        fieldErrors: toFieldErrors(result.data?.errors),
      };
    }
  } catch {
    return { error: SERVER_ERROR };
  }

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function searchUsers(query: string): Promise<UserSearchResult[]> {
  const search = query.trim();
  if (search.length < 2) return [];

  try {
    const [result, currentUser] = await Promise.all([
      api(`/users/search?query=${encodeURIComponent(search)}`),
      getCurrentUser(),
    ]);
    if (!result.success) return [];
    const users: UserSearchResult[] = result.data?.users ?? [];
    return users.filter((user) => user.id !== currentUser?.id);
  } catch {
    return [];
  }
}
