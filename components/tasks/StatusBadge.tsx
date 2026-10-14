import type { TaskStatus } from "@/lib/tasks";

const STATUS_STYLES: Record<TaskStatus, { label: string; className: string }> = {
  TODO: { label: "À faire", className: "bg-error-light text-error-text" },
  IN_PROGRESS: { label: "En cours", className: "bg-warning-light text-warning-text" },
  DONE: { label: "Terminée", className: "bg-success-light text-success-text" },
  CANCELLED: { label: "Annulée", className: "bg-grey-200 text-grey-800" },
};

export default function StatusBadge({ status }: { status: TaskStatus }) {
  const { label, className } = STATUS_STYLES[status] ?? STATUS_STYLES.TODO;
  return (
    <span className={`rounded-[10px] px-4 py-0.5 text-body-s whitespace-nowrap ${className}`}>
      {label}
    </span>
  );
}
