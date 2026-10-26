"use client";

import { useActionState, useEffect, useId, useState } from "react";
import type { TaskFormState } from "@/app/(main)/projects/[id]/actions";
import AssigneeSelect, { type Member } from "@/components/tasks/AssigneeSelect";
import PriorityPicker from "@/components/tasks/PriorityPicker";
import StatusPicker from "@/components/tasks/StatusPicker";
import TextField from "@/components/ui/TextField";
import type { Task, TaskPriority, TaskStatus } from "@/lib/tasks";

type TaskFormProps = {
  action: (state: TaskFormState, formData: FormData) => Promise<TaskFormState>;
  members: Member[];
  task?: Task;
  submitLabel: string;
  pendingLabel: string;
  onSuccess: () => void;
};

function toDateInputValue(date?: string) {
  return date ? new Date(date).toISOString().slice(0, 10) : "";
}

export default function TaskForm({
  action,
  members,
  task,
  submitLabel,
  pendingLabel,
  onSuccess,
}: TaskFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const formId = useId();

  const initial = {
    title: task?.title ?? "",
    description: task?.description ?? "",
    dueDate: toDateInputValue(task?.dueDate),
    status: (task?.status === "CANCELLED" ? "TODO" : (task?.status ?? "TODO")) as TaskStatus,
    assigneeIds: task?.assignees?.map((assignee) => assignee.user.id) ?? [],
    priority: (task?.priority ?? "MEDIUM") as TaskPriority,
  };

  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [dueDate, setDueDate] = useState(initial.dueDate);
  const [status, setStatus] = useState<TaskStatus>(initial.status);
  const [assigneeIds, setAssigneeIds] = useState<string[]>(initial.assigneeIds);
  const [priority, setPriority] = useState<TaskPriority>(initial.priority);

  useEffect(() => {
    if (state?.success) onSuccess();
  }, [state, onSuccess]);

  const isComplete = Boolean(title.trim() && description.trim() && dueDate);
  const hasChanged =
    !task ||
    title !== initial.title ||
    description !== initial.description ||
    dueDate !== initial.dueDate ||
    status !== initial.status ||
    priority !== initial.priority ||
    [...assigneeIds].sort().join() !== [...initial.assigneeIds].sort().join();
  const canSubmit = isComplete && hasChanged && !pending;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      <TextField
        id={`${formId}-title`}
        name="title"
        label="Titre"
        requiredMark={!task}
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        error={state?.fieldErrors?.title}
      />
      <TextField
        id={`${formId}-description`}
        name="description"
        label="Description"
        requiredMark={!task}
        required
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        error={state?.fieldErrors?.description}
      />
      <TextField
        id={`${formId}-dueDate`}
        name="dueDate"
        type="date"
        label="Échéance"
        requiredMark={!task}
        required
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
        error={state?.fieldErrors?.dueDate}
      />
      <AssigneeSelect
        name="assigneeIds"
        members={members}
        value={assigneeIds}
        onChange={setAssigneeIds}
        error={state?.fieldErrors?.assigneeIds}
      />
      <StatusPicker name="status" value={status} onChange={setStatus} />
      <PriorityPicker name="priority" value={priority} onChange={setPriority} />

      {state?.error && (
        <p role="alert" className="rounded bg-error-light px-4 py-3 text-body-s text-error-text">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-6 h-[50px] self-start rounded-[10px] bg-grey-800 px-6 text-body-m text-white transition-colors hover:bg-grey-950 disabled:cursor-not-allowed disabled:bg-grey-200 disabled:text-grey-400"
      >
        {pending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}
