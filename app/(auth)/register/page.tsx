import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Inscription | Abricot",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
