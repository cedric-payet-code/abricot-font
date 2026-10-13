import { cache } from "react";
import { api } from "@/lib/api";

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
