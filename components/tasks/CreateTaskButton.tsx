"use client";

import { useCallback, useState } from "react";
import { createTask } from "@/app/(main)/projects/[id]/actions";
import type { Member } from "@/components/tasks/AssigneeSelect";
import TaskForm from "@/components/tasks/TaskForm";
import Modal from "@/components/ui/Modal";

type CreateTaskButtonProps = {
  projectId: string;
  members: Member[];
};

export default function CreateTaskButton({ projectId, members }: CreateTaskButtonProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="h-[50px] rounded-[10px] bg-grey-800 px-3 text-body-m text-white transition-colors hover:bg-grey-950"
      >
        Créer une tâche
      </button>

      <Modal open={open} onClose={close} title="Créer une tâche">
        <TaskForm
          action={createTask.bind(null, projectId)}
          members={members}
          submitLabel="+ Ajouter une tâche"
          pendingLabel="Ajout…"
          onSuccess={close}
        />
      </Modal>
    </>
  );
}
