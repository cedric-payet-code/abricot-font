import Link from "next/link";
import { CalendarIcon, CommentIcon, FolderIcon } from "@/components/icons/UiIcons";
import StatusBadge from "@/components/tasks/StatusBadge";
import { formatShortDate } from "@/lib/format";
import type { Task } from "@/lib/tasks";

type AssignedTaskCardProps = {
  task: Task;
  projectName?: string;
};

export default function AssignedTaskCard({ task, projectName }: AssignedTaskCardProps) {
  const { title, description, status, dueDate, projectId, comments } = task;
  const commentCount = task._count?.comments ?? comments?.length ?? 0;

  return (
    <article className="flex flex-col gap-6 rounded-[10px] border border-grey-200 bg-white px-6 py-6 md:px-10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-h5 text-grey-950">{title}</h3>
          {description && <p className="text-body-s text-grey-600">{description}</p>}
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-body-xs text-grey-600">
          {projectName && (
            <li className="flex items-center gap-1.5">
              <FolderIcon className="h-4 w-4" />
              <span className="sr-only">Projet :</span>
              {projectName}
            </li>
          )}
          {dueDate && (
            <li className="flex items-center gap-1.5 border-l border-grey-400 pl-3 first:border-0 first:pl-0">
              <CalendarIcon className="h-4 w-4" />
              <span className="sr-only">Échéance :</span>
              <time dateTime={dueDate}>{formatShortDate(dueDate)}</time>
            </li>
          )}
          <li className="flex items-center gap-1.5 border-l border-grey-400 pl-3 first:border-0 first:pl-0">
            <CommentIcon className="h-4 w-4" />
            <span className="sr-only">Commentaires :</span>
            {commentCount}
          </li>
        </ul>

        <Link
          href={`/projects/${projectId}`}
          aria-label={`Voir la tâche ${title}`}
          className="flex h-[50px] items-center justify-center self-end rounded-[10px] bg-grey-800 px-12 text-body-m text-white transition-colors hover:bg-grey-950"
        >
          Voir
        </Link>
      </div>
    </article>
  );
}
