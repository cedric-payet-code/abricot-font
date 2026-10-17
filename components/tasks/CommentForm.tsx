"use client";

import { useActionState, useId, useState } from "react";
import { addComment, type CommentFormState } from "@/app/(main)/projects/[id]/actions";
import Avatar from "@/components/ui/Avatar";

type CommentFormProps = {
  projectId: string;
  taskId: string;
  taskTitle: string;
  currentUserName?: string;
};

const MAX_LENGTH = 2000;

export default function CommentForm({
  projectId,
  taskId,
  taskTitle,
  currentUserName,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const fieldId = useId();
  const errorId = `${fieldId}-error`;

  async function submit(previousState: CommentFormState, formData: FormData) {
    const result = await addComment(projectId, taskId, previousState, formData);
    if (result?.success) setContent("");
    return result;
  }

  const [state, formAction, pending] = useActionState(submit, undefined);
  const canSubmit = content.trim().length > 0 && !pending;

  return (
    <form action={formAction} className="flex flex-col gap-3 pt-2 pb-2">
      <div className="flex items-start gap-2">
        <Avatar name={currentUserName ?? ""} />
        <label htmlFor={fieldId} className="sr-only">
          Ajouter un commentaire à la tâche {taskTitle}
        </label>
        <textarea
          id={fieldId}
          name="content"
          rows={3}
          maxLength={MAX_LENGTH}
          placeholder="Ajouter un commentaire…"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          aria-invalid={state?.error ? true : undefined}
          aria-describedby={state?.error ? errorId : undefined}
          className={`min-h-[80px] flex-1 resize-y rounded-[10px] border bg-grey-100 px-4 py-3 text-body-xs text-grey-950 placeholder:text-grey-600 transition-colors hover:border-grey-400 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus-visible:outline-none ${
            state?.error ? "border-error" : "border-grey-100"
          }`}
        />
      </div>

      {state?.error && (
        <p id={errorId} role="alert" className="text-body-xs text-error-text">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="h-[50px] self-end rounded-[10px] bg-grey-800 px-7 text-body-m text-white transition-colors hover:bg-grey-950 disabled:cursor-not-allowed disabled:bg-grey-200 disabled:text-grey-600"
      >
        {pending ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
