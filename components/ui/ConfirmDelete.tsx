"use client";

import { useActionState, useEffect } from "react";

type DeleteState = { success?: boolean; error?: string } | undefined;

type ConfirmDeleteProps = {
  action: (state: DeleteState) => Promise<DeleteState>;
  message: React.ReactNode;
  confirmLabel: string;
  onCancel: () => void;
  onSuccess?: () => void;
};

export default function ConfirmDelete({
  action,
  message,
  confirmLabel,
  onCancel,
  onSuccess,
}: ConfirmDeleteProps) {
  const [state, formAction, pending] = useActionState(action, undefined);

  useEffect(() => {
    if (state?.success) onSuccess?.();
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 text-body-m text-grey-600">{message}</div>

      {state?.error && (
        <p role="alert" className="rounded bg-error-light px-4 py-3 text-body-s text-error-text">
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="h-[50px] rounded-[10px] bg-error-text px-7 text-body-m text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-grey-200 disabled:text-grey-400"
        >
          {pending ? "Suppression…" : confirmLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-[50px] rounded-[10px] border border-grey-200 bg-white px-7 text-body-m text-grey-950 transition-colors hover:border-grey-400"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
