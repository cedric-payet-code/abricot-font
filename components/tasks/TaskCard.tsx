import { CalendarIcon, DotsIcon } from "@/components/icons/UiIcons";
import Avatar from "@/components/ui/Avatar";
import StatusBadge from "@/components/tasks/StatusBadge";
import TaskComments from "@/components/tasks/TaskComments";
import { formatShortDate } from "@/lib/format";
import type { Task } from "@/lib/tasks";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const { title, description, status, dueDate, assignees = [], comments = [] } = task;

  return (
    <article className="rounded-[10px] border border-grey-200 bg-white px-6 pt-6 md:px-10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-h5 text-grey-950">{title}</h3>
            <StatusBadge status={status} />
          </div>
          {description && <p className="text-body-s text-grey-600">{description}</p>}
        </div>

        <button
          type="button"
          aria-label={`Actions pour la tâche ${title}`}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] border border-grey-200 bg-white text-grey-950 transition-colors hover:border-grey-400"
        >
          <DotsIcon />
        </button>
      </div>

      <dl className="mt-6 flex flex-col gap-4 pb-6 text-body-xs">
        {dueDate && (
          <div className="flex items-center gap-2">
            <dt className="text-grey-600">Échéance :</dt>
            <dd className="flex items-center gap-1.5 text-grey-950">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime={dueDate}>{formatShortDate(dueDate)}</time>
            </dd>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <dt className="text-grey-600">Assigné à :</dt>
          <dd>
            {assignees.length === 0 ? (
              <span className="text-grey-600">Personne</span>
            ) : (
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {assignees.map(({ id: assigneeId, user }) => (
                  <li key={assigneeId} className="flex items-center gap-1.5">
                    <Avatar name={user.name} />
                    <span className="rounded-[10px] bg-grey-200 px-4 py-0.5 text-body-s text-grey-800">
                      {user.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </dd>
        </div>
      </dl>

      <TaskComments comments={comments} />
    </article>
  );
}
