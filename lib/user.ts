import { cache } from "react";
import { api } from "@/lib/api";

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const getCurrentUser = cache(async (): Promise<User | null> => {
  try {
    const result = await api("/auth/profile");
    if (!result.success) return null;
    return result.data?.user ?? result.data ?? null;
  } catch {
    return null;
  }
});
