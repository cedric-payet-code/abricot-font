"use client";

import { useCallback, useState } from "react";
import { updateTask } from "@/app/(main)/projects/[id]/actions";
import { DotsIcon } from "@/components/icons/UiIcons";
import type { Member } from "@/components/tasks/AssigneeSelect";
import TaskForm from "@/components/tasks/TaskForm";
import Modal from "@/components/ui/Modal";
import type { Task } from "@/lib/tasks";

type EditTaskButtonProps = {
  projectId: string;
  task: Task;
  members: Member[];
};

export default function EditTaskButton({ projectId, task, members }: EditTaskButtonProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`Modifier la tâche ${task.title}`}
        onClick={() => setOpen(true)}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] border border-grey-200 bg-white text-grey-950 transition-colors hover:border-grey-400"
      >
        <DotsIcon />
      </button>

      <Modal open={open} onClose={close} title="Modifier">
        <TaskForm
          action={updateTask.bind(null, projectId, task.id)}
          members={members}
          task={task}
          submitLabel="Enregistrer"
          pendingLabel="Enregistrement…"
          onSuccess={close}
        />
      </Modal>
    </>
  );
}
