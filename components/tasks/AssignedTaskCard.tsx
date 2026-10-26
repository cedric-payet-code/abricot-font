import Link from "next/link";
import { CalendarIcon, CommentIcon, FolderIcon } from "@/components/icons/UiIcons";
import StatusBadge from "@/components/tasks/StatusBadge";
import { formatShortDate } from "@/lib/format";
import type { Task } from "@/lib/tasks";

type AssignedTaskCardProps = {
  task: Task;
  projectName?: string;
  layout?: "row" | "stacked";
};

export default function AssignedTaskCard({
  task,
  projectName,
  layout = "row",
}: AssignedTaskCardProps) {
  const { title, description, status, dueDate, projectId, comments } = task;
  const commentCount = task._count?.comments ?? comments?.length ?? 0;

  return (
    <article
      className={`flex flex-col gap-6 rounded-[10px] border border-grey-200 bg-white py-6 ${
        layout === "row" ? "px-6 md:px-10" : "px-6"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-h5 text-grey-950">{title}</h3>
          {description && <p className="text-body-s text-grey-600">{description}</p>}
        </div>
        <StatusBadge status={status} />
      </div>

      <div
        className={`flex flex-col gap-4 ${
          layout === "row" ? "sm:flex-row sm:items-end sm:justify-between" : "items-stretch"
        }`}
      >
        <ul className="flex min-w-0 items-center gap-2 text-body-xs whitespace-nowrap text-grey-600">
          {projectName && (
            <li className="flex min-w-0 items-center gap-1.5" title={projectName}>
              <FolderIcon className="h-4 w-4 shrink-0 text-grey-400" />
              <span className="sr-only">Projet :</span>
              <span className="truncate">{projectName}</span>
            </li>
          )}
          {dueDate && (
            <li className="flex shrink-0 items-center gap-1.5 border-l border-grey-400 pl-2 first:border-0 first:pl-0">
              <CalendarIcon className="h-4 w-4 shrink-0" />
              <span className="sr-only">Échéance :</span>
              <time dateTime={dueDate}>{formatShortDate(dueDate)}</time>
            </li>
          )}
          <li className="flex shrink-0 items-center gap-1.5 border-l border-grey-400 pl-2 first:border-0 first:pl-0">
            <CommentIcon className="h-4 w-4 shrink-0" />
            <span className="sr-only">Commentaires :</span>
            {commentCount}
          </li>
        </ul>

        <Link
          href={`/projects/${projectId}`}
          aria-label={`Voir la tâche ${title}`}
          className={`flex h-[50px] items-center justify-center rounded-[10px] bg-grey-800 px-12 text-body-m text-white transition-colors hover:bg-grey-950 ${
            layout === "row" ? "self-end" : "self-start"
          }`}
        >
          Voir
        </Link>
      </div>
    </article>
  );
}
