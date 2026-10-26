"use client";

import { useCallback, useState } from "react";
import { deleteTask, updateTask } from "@/app/(main)/projects/[id]/actions";
import { DotsIcon } from "@/components/icons/UiIcons";
import type { Member } from "@/components/tasks/AssigneeSelect";
import TaskForm from "@/components/tasks/TaskForm";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import Modal from "@/components/ui/Modal";
import type { Task } from "@/lib/tasks";

type EditTaskButtonProps = {
  projectId: string;
  task: Task;
  members: Member[];
};

export default function EditTaskButton({ projectId, task, members }: EditTaskButtonProps) {
  const [open, setOpen] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setConfirmingDelete(false);
  }, []);
  const cancelDelete = useCallback(() => setConfirmingDelete(false), []);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`Modifier la tâche ${task.title}`}
        onClick={() => setOpen(true)}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] border border-grey-200 bg-white text-grey-600 transition-colors hover:border-grey-400"
      >
        <DotsIcon />
      </button>

      <Modal
        open={open}
        onClose={close}
        title={confirmingDelete ? "Supprimer la tâche" : "Modifier"}
      >
        {confirmingDelete ? (
          <ConfirmDelete
            action={deleteTask.bind(null, projectId, task.id)}
            message={
              <p>
                La tâche <strong className="font-semibold text-grey-950">{task.title}</strong> et
                ses commentaires seront définitivement supprimés.
              </p>
            }
            confirmLabel="Supprimer la tâche"
            onCancel={cancelDelete}
            onSuccess={close}
          />
        ) : (
          <>
            <TaskForm
              action={updateTask.bind(null, projectId, task.id)}
              members={members}
              task={task}
              submitLabel="Enregistrer"
              pendingLabel="Enregistrement…"
              onSuccess={close}
            />
            <div className="mt-8 border-t border-grey-200 pt-6">
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                className="flex h-[50px] items-center rounded-[10px] border border-brand-text bg-white px-6 text-body-m text-brand-text transition-colors hover:bg-brand-text hover:text-white"
              >
                Supprimer la tâche
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
