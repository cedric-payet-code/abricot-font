"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import type { TaskPriority, TaskStatus } from "@/lib/tasks";

export type TaskFormState =
  | {
      success?: boolean;
      error?: string;
      fieldErrors?: Record<string, string>;
    }
  | undefined;

const SERVER_ERROR = "Le serveur est injoignable. Réessayez plus tard.";

function readTaskForm(formData: FormData) {
  const dueDate = String(formData.get("dueDate") ?? "");
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    dueDate: dueDate ? new Date(`${dueDate}T12:00:00`).toISOString() : undefined,
    status: String(formData.get("status") ?? "TODO") as TaskStatus,
    priority: String(formData.get("priority") ?? "MEDIUM") as TaskPriority,
    assigneeIds: formData.getAll("assigneeIds").map(String),
  };
}

function validate(task: ReturnType<typeof readTaskForm>) {
  const fieldErrors: Record<string, string> = {};
  if (!task.title) fieldErrors.title = "Le titre est requis.";
  if (!task.description) fieldErrors.description = "La description est requise.";
  if (!task.dueDate) fieldErrors.dueDate = "L'échéance est requise.";
  return Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined;
}

function toFieldErrors(errors?: { field: string; message: string }[]) {
  if (!errors?.length) return undefined;
  return Object.fromEntries(errors.map((e) => [e.field, e.message]));
}

function refreshPages(projectId: string) {
  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/projects");
  revalidatePath("/dashboard");
}

export async function createTask(
  projectId: string,
  _prevState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  const task = readTaskForm(formData);
  const fieldErrors = validate(task);
  if (fieldErrors) return { error: "Veuillez remplir les champs obligatoires.", fieldErrors };

  try {
    const { status, ...body } = task;
    const result = await api(`/projects/${projectId}/tasks`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!result.success) {
      return {
        error: result.message ?? "La création de la tâche a échoué.",
        fieldErrors: toFieldErrors(result.data?.errors),
      };
    }

    if (status !== "TODO") {
      await api(`/projects/${projectId}/tasks/${result.data.task.id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
    }
  } catch {
    return { error: SERVER_ERROR };
  }

  refreshPages(projectId);
  return { success: true };
}

export async function updateTask(
  projectId: string,
  taskId: string,
  _prevState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  const task = readTaskForm(formData);
  const fieldErrors = validate(task);
  if (fieldErrors) return { error: "Veuillez remplir les champs obligatoires.", fieldErrors };

  try {
    const result = await api(`/projects/${projectId}/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(task),
    });

    if (!result.success) {
      return {
        error: result.message ?? "La modification de la tâche a échoué.",
        fieldErrors: toFieldErrors(result.data?.errors),
      };
    }
  } catch {
    return { error: SERVER_ERROR };
  }

  refreshPages(projectId);
  return { success: true };
}
