"use client";

import { useActionState } from "react";
import { register } from "@/app/(auth)/actions";
import AuthForm from "@/components/auth/AuthForm";
import TextField from "@/components/ui/TextField";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(register, undefined);

  return (
    <AuthForm
      title="Inscription"
      action={action}
      pending={pending}
      error={state?.error}
      submitLabel="S'inscrire"
      pendingLabel="Inscription…"
      footerText="Déjà inscrit ?"
      footerLinkLabel="Se connecter"
      footerLinkHref="/login"
    >
      <TextField
        id="name"
        label="Nom"
        type="text"
        autoComplete="name"
        required
        defaultValue={state?.values?.name}
        error={state?.fieldErrors?.name}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        defaultValue={state?.values?.email}
        error={state?.fieldErrors?.email}
      />
      <TextField
        id="password"
        label="Mot de passe"
        type="password"
        autoComplete="new-password"
        required
        hint="8 caractères minimum, dont une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)."
        error={state?.fieldErrors?.password}
      />
    </AuthForm>
  );
}
