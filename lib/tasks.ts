import { cache } from "react";
import { api } from "@/lib/api";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TaskUser = {
  id: string;
  email: string;
  name: string;
};

export type TaskAssignee = {
  id: string;
  user: TaskUser;
};

export type TaskComment = {
  id: string;
  content: string;
  createdAt: string;
  author: TaskUser;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  projectId: string;
  assignees?: TaskAssignee[];
  comments?: TaskComment[];
  project?: { id: string; name: string };
  _count?: { comments?: number };
};

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  URGENT: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

function dueTime(task: Task) {
  return task.dueDate ? new Date(task.dueDate).getTime() : Number.POSITIVE_INFINITY;
}

export function compareByUrgency(a: Task, b: Task) {
  return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] || dueTime(a) - dueTime(b);
}

export function sortByPriority(tasks: Task[]) {
  return [...tasks].sort(compareByUrgency);
}

export function isOpenTask(task: Task) {
  return task.status !== "DONE" && task.status !== "CANCELLED";
}

export const getProjectTasks = cache(async (projectId: string): Promise<Task[]> => {
  const result = await api(`/projects/${projectId}/tasks`);
  if (!result.success) {
    throw new Error(result.message ?? "Impossible de récupérer les tâches.");
  }
  return Array.isArray(result.data) ? result.data : (result.data?.tasks ?? []);
});

export type Progress = {
  done: number;
  total: number;
};

export async function getProjectProgress(projectId: string): Promise<Progress | null> {
  try {
    const tasks = await getProjectTasks(projectId);
    const done = tasks.filter((task) => task.status === "DONE").length;
    return { done, total: tasks.length };
  } catch {
    return null;
  }
}

export const getAssignedTasks = cache(async (): Promise<Task[]> => {
  const result = await api("/dashboard/assigned-tasks");
  if (!result.success) {
    throw new Error(result.message ?? "Impossible de récupérer vos tâches.");
  }
  return Array.isArray(result.data) ? result.data : (result.data?.tasks ?? []);
});
