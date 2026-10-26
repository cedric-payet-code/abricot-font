import type { Metadata } from "next";
import NotFoundCard from "@/components/layout/NotFoundCard";

export const metadata: Metadata = {
  title: "Page introuvable | Abricot",
};

export default function NotFound() {
  return <NotFoundCard />;
}
