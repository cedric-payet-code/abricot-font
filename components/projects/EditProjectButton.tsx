"use client";

import { useCallback, useState } from "react";
import { updateProject, type UserSearchResult } from "@/app/(main)/projects/actions";
import ProjectForm from "@/components/projects/ProjectForm";
import Modal from "@/components/ui/Modal";

type EditProjectButtonProps = {
  project: {
    id: string;
    name: string;
    description?: string | null;
    contributors: UserSearchResult[];
  };
};

export default function EditProjectButton({ project }: EditProjectButtonProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="text-body-s text-brand-text underline underline-offset-2 hover:text-grey-950"
      >
        Modifier
      </button>

      <Modal open={open} onClose={close} title="Modifier un projet">
        <ProjectForm
          action={updateProject.bind(null, project.id)}
          project={project}
          submitLabel="Enregistrer"
          pendingLabel="Enregistrement…"
          onSuccess={close}
        />
      </Modal>
    </>
  );
}
