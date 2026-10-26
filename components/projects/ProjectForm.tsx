"use client";

import { useActionState, useEffect, useId, useState } from "react";
import type { ProjectFormState, UserSearchResult } from "@/app/(main)/projects/actions";
import ContributorSelect from "@/components/projects/ContributorSelect";
import TextField from "@/components/ui/TextField";

type ProjectFormProps = {
  action: (state: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;
  project?: {
    name: string;
    description?: string | null;
    contributors: UserSearchResult[];
  };
  submitLabel: string;
  pendingLabel: string;
  onSuccess: () => void;
};

export default function ProjectForm({
  action,
  project,
  submitLabel,
  pendingLabel,
  onSuccess,
}: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const formId = useId();

  const initialName = project?.name ?? "";
  const initialDescription = project?.description ?? "";
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const initialContributors = project?.contributors ?? [];
  const [contributors, setContributors] = useState<UserSearchResult[]>(initialContributors);

  useEffect(() => {
    if (state?.success) onSuccess();
  }, [state, onSuccess]);

  const isComplete = Boolean(name.trim() && description.trim());
  const hasChanged =
    !project ||
    name.trim() !== initialName.trim() ||
    description.trim() !== initialDescription.trim() ||
    contributors.length !== initialContributors.length ||
    contributors.some((user) => !initialContributors.some((initial) => initial.id === user.id));
  const canSubmit = isComplete && hasChanged && !pending;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      <TextField
        id={`${formId}-name`}
        name="name"
        label="Titre"
        requiredMark
        required
        maxLength={100}
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={state?.fieldErrors?.name}
      />
      <TextField
        id={`${formId}-description`}
        name="description"
        label="Description"
        requiredMark
        required
        maxLength={500}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        error={state?.fieldErrors?.description}
      />
      <ContributorSelect
        name="contributors"
        value={contributors}
        onChange={setContributors}
        error={state?.fieldErrors?.contributors}
      />

      {state?.error && (
        <p role="alert" className="rounded bg-error-light px-4 py-3 text-body-s text-error-text">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-6 h-[50px] self-start rounded-[10px] bg-grey-800 px-7 text-body-m text-white transition-colors hover:bg-grey-950 disabled:cursor-not-allowed disabled:bg-grey-200 disabled:text-grey-400"
      >
        {pending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}
