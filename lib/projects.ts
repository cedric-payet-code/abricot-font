import { cache } from "react";
import { api } from "@/lib/api";
import { compareByUrgency, isOpenTask, type Task } from "@/lib/tasks";

export type ProjectUser = {
  id: string;
  email: string;
  name: string;
};

export type ProjectRole = "ADMIN" | "CONTRIBUTOR";

export type ProjectMember = {
  id: string;
  role: ProjectRole;
  user: ProjectUser;
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  owner: ProjectUser;
  members: ProjectMember[];
  _count: { tasks: number };
  userRole: ProjectRole;
};

export const getProjects = cache(async (): Promise<Project[]> => {
  const result = await api("/projects");
  if (!result.success) {
    throw new Error(result.message ?? "Impossible de récupérer vos projets.");
  }
  return result.data?.projects ?? [];
});

export function sortProjectsByUrgency(projects: Project[], assignedTasks: Task[]) {
  const mostUrgentTask = new Map<string, Task>();
  for (const task of assignedTasks.filter(isOpenTask)) {
    const current = mostUrgentTask.get(task.projectId);
    if (!current || compareByUrgency(task, current) < 0) {
      mostUrgentTask.set(task.projectId, task);
    }
  }

  return [...projects].sort((a, b) => {
    const taskA = mostUrgentTask.get(a.id);
    const taskB = mostUrgentTask.get(b.id);
    if (taskA && taskB) return compareByUrgency(taskA, taskB);
    if (taskA) return -1;
    if (taskB) return 1;
    return 0;
  });
}
