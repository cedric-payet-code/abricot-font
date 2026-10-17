"use client";

import { useActionState, useState, type FormEvent } from "react";
import { updateAccount, type AccountFormState } from "@/app/(main)/account/actions";
import Modal from "@/components/ui/Modal";
import TextField from "@/components/ui/TextField";
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from "@/lib/validation";

type AccountFormProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function AccountForm(initialValues: AccountFormProps) {
  const [firstName, setFirstName] = useState(initialValues.firstName);
  const [lastName, setLastName] = useState(initialValues.lastName);
  const [email, setEmail] = useState(initialValues.email);
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string>();
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function submit(previousState: AccountFormState, formData: FormData) {
    const result = await updateAccount(previousState, formData);
    if (!result?.fieldErrors?.currentPassword) setConfirmOpen(false);
    if (result?.success) setNewPassword("");
    return result;
  }

  const [state, formAction, pending] = useActionState(submit, undefined);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!newPassword || confirmOpen) return;
    event.preventDefault();
    if (!PASSWORD_RULE.test(newPassword)) {
      setPasswordError(PASSWORD_RULE_MESSAGE);
      return;
    }
    setPasswordError(undefined);
    setConfirmOpen(true);
  }

  const fieldErrors = confirmOpen ? undefined : state?.fieldErrors;

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="mt-10 flex flex-col gap-8"
    >
      <TextField
        id="lastName"
        label="Nom"
        type="text"
        autoComplete="family-name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        error={fieldErrors?.lastName}
      />
      <TextField
        id="firstName"
        label="Prénom"
        type="text"
        autoComplete="given-name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        error={fieldErrors?.firstName}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={fieldErrors?.email}
      />
      <TextField
        id="newPassword"
        label="Mot de passe"
        type="password"
        autoComplete="new-password"
        value={newPassword}
        onChange={(event) => {
          setNewPassword(event.target.value);
          setPasswordError(undefined);
        }}
        error={passwordError ?? fieldErrors?.newPassword}
      />

      <div aria-live="polite">
        {!confirmOpen && state?.success && (
          <p className="rounded bg-success-light px-4 py-3 text-body-s text-success-text">
            {state.success}
          </p>
        )}
        {!confirmOpen && state?.error && (
          <p className="rounded bg-error-light px-4 py-3 text-body-s text-error-text">
            {state.error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="h-[50px] self-start rounded-[10px] bg-grey-800 px-7 text-body-m text-white transition-colors hover:bg-grey-950 disabled:cursor-not-allowed disabled:bg-grey-200 disabled:text-grey-600"
      >
        {pending && !confirmOpen ? "Enregistrement…" : "Modifier les informations"}
      </button>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirmer le changement"
      >
        <div className="flex flex-col gap-8">
          <p className="text-body-m text-grey-600">
            Pour modifier votre mot de passe, saisissez votre mot de passe actuel.
          </p>
          <TextField
            id="currentPassword"
            label="Mot de passe actuel"
            type="password"
            autoComplete="current-password"
            error={state?.fieldErrors?.currentPassword}
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={pending}
              className="h-[50px] rounded-[10px] bg-grey-800 px-7 text-body-m text-white transition-colors hover:bg-grey-950 disabled:cursor-not-allowed disabled:bg-grey-200 disabled:text-grey-600"
            >
              {pending ? "Enregistrement…" : "Confirmer"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="h-[50px] rounded-[10px] border border-grey-200 px-7 text-body-m text-grey-950 transition-colors hover:border-grey-400"
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </form>
  );
}
