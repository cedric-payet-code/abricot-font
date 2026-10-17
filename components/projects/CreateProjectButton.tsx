"use client";

import { useCallback, useState } from "react";
import { createProject } from "@/app/(main)/projects/actions";
import ProjectForm from "@/components/projects/ProjectForm";
import Modal from "@/components/ui/Modal";

export default function CreateProjectButton() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="h-[50px] self-start rounded-[10px] bg-grey-800 px-7 text-body-m text-white transition-colors hover:bg-grey-950 sm:self-auto"
      >
        + Créer un projet
      </button>

      <Modal open={open} onClose={close} title="Créer un projet">
        <ProjectForm
          action={createProject}
          submitLabel="Ajouter un projet"
          pendingLabel="Création…"
          onSuccess={close}
        />
      </Modal>
    </>
  );
}
