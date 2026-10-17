import AssignedTaskCard from "@/components/tasks/AssignedTaskCard";
import type { Task, TaskStatus } from "@/lib/tasks";

type KanbanBoardProps = {
  tasks: Task[] | null;
  projectNames: Record<string, string>;
};

const COLUMNS: { status: TaskStatus; title: string }[] = [
  { status: "TODO", title: "À faire" },
  { status: "IN_PROGRESS", title: "En cours" },
  { status: "DONE", title: "Terminées" },
];

export default function KanbanBoard({ tasks, projectNames }: KanbanBoardProps) {
  if (tasks === null) {
    return (
      <p role="alert" className="text-body-m text-error-text">
        Impossible de récupérer vos tâches.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {COLUMNS.map(({ status, title }) => {
        const columnTasks = tasks.filter((task) => task.status === status);
        const titleId = `kanban-${status}`;

        return (
          <section
            key={status}
            aria-labelledby={titleId}
            className="flex flex-col gap-10 rounded-[10px] border border-brand-light bg-white px-6 py-10"
          >
            <h2 id={titleId} className="flex items-center gap-2 text-h5 text-grey-950">
              {title}
              <span className="rounded-full bg-grey-200 px-4 py-0.5 text-body-xs text-grey-800">
                {columnTasks.length}
                <span className="sr-only"> {columnTasks.length > 1 ? "tâches" : "tâche"}</span>
              </span>
            </h2>

            {columnTasks.length === 0 ? (
              <p className="text-body-s text-grey-600">Aucune tâche.</p>
            ) : (
              <ul className="flex flex-col gap-4">
                {columnTasks.map((task) => (
                  <li key={task.id}>
                    <AssignedTaskCard
                      task={task}
                      projectName={task.project?.name ?? projectNames[task.projectId]}
                      layout="stacked"
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
