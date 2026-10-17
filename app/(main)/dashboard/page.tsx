import type { Metadata } from "next";
import AssignedTasks from "@/components/dashboard/AssignedTasks";
import { CalendarIcon, ListIcon } from "@/components/icons/UiIcons";
import { getProjects } from "@/lib/projects";
import { getAssignedTasks, sortByPriority } from "@/lib/tasks";
import { getCurrentUser } from "@/lib/user";

export const metadata: Metadata = {
  title: "Tableau de bord | Abricot",
};

export default async function DashboardPage() {
  const [user, tasks, projects] = await Promise.all([
    getCurrentUser(),
    getAssignedTasks()
      .then(sortByPriority)
      .catch(() => null),
    getProjects().catch(() => []),
  ]);

  const projectNames = Object.fromEntries(projects.map((project) => [project.id, project.name]));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-h4 text-grey-950">Tableau de bord</h1>
          {user && (
            <p className="text-body-l text-grey-950">
              Bonjour {user.name}, voici un aperçu de vos projets et tâches
            </p>
          )}
        </div>
        <button
          type="button"
          className="h-[50px] self-start rounded-[10px] bg-grey-800 px-7 text-body-m text-white transition-colors hover:bg-grey-950 sm:self-auto"
        >
          + Créer un projet
        </button>
      </div>

      <div role="group" aria-label="Affichage des tâches" className="flex gap-2">
        <button
          type="button"
          aria-pressed="true"
          className="flex h-[45px] items-center gap-2 rounded-lg bg-brand-light px-4 text-body-s text-brand-dark"
        >
          <ListIcon className="text-brand-dark" />
          Liste
        </button>
        <button
          type="button"
          aria-pressed="false"
          className="flex h-[45px] items-center gap-2 rounded-lg bg-white px-4 text-body-s text-brand-dark transition-colors hover:bg-brand-light"
        >
          <CalendarIcon className="text-brand-dark" />
          Kanban
        </button>
      </div>

      <AssignedTasks tasks={tasks} projectNames={projectNames} />
    </div>
  );
}
