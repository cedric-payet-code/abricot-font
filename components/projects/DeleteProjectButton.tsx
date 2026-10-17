"use client";

import { useCallback, useState } from "react";
import { deleteProject } from "@/app/(main)/projects/actions";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import Modal from "@/components/ui/Modal";

type DeleteProjectButtonProps = {
  project: { id: string; name: string };
};

export default function DeleteProjectButton({ project }: DeleteProjectButtonProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="flex h-[50px] items-center rounded-[10px] border border-brand-dark bg-white px-6 text-body-m text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
      >
        Supprimer
      </button>

      <Modal open={open} onClose={close} title="Supprimer le projet">
        <ConfirmDelete
          action={deleteProject.bind(null, project.id)}
          message={
            <>
              <p>
                Le projet <strong className="font-semibold text-grey-950">{project.name}</strong>,
                ses tâches et leurs commentaires seront définitivement supprimés.
              </p>
              <p>Cette action est irréversible.</p>
            </>
          }
          confirmLabel="Supprimer le projet"
          onCancel={close}
        />
      </Modal>
    </>
  );
}
