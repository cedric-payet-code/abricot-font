import { cache } from "react";
import { api, SESSION_EXPIRED } from "@/lib/api";

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type Session = {
  user: User | null;
  expired: boolean;
};

export const getSession = cache(async (): Promise<Session> => {
  try {
    const result = await api("/auth/profile");
    if (result.success) {
      return { user: result.data?.user ?? result.data ?? null, expired: false };
    }
    return { user: null, expired: result.error === SESSION_EXPIRED };
  } catch {
    return { user: null, expired: false };
  }
});

export const getCurrentUser = cache(async (): Promise<User | null> => {
  return (await getSession()).user;
});
