"use client";

import { useActionState } from "react";
import { login } from "@/app/(auth)/actions";
import AuthForm from "@/components/auth/AuthForm";
import TextField from "@/components/ui/TextField";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <AuthForm
      title="Connexion"
      action={action}
      pending={pending}
      error={state?.error}
      submitLabel="Se connecter"
      pendingLabel="Connexion…"
      footerText="Pas encore de compte ?"
      footerLinkLabel="Créer un compte"
      footerLinkHref="/register"
    >
      <TextField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        defaultValue={state?.values?.email}
      />
      <TextField
        id="password"
        label="Mot de passe"
        type="password"
        autoComplete="current-password"
        required
      />
    </AuthForm>
  );
}
