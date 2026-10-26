import type { Metadata } from "next";
import CreateProjectButton from "@/components/projects/CreateProjectButton";
import DashboardTasks from "@/components/dashboard/DashboardTasks";
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
          <h1 className="text-h4 text-grey-800">Tableau de bord</h1>
          {user && (
            <p className="text-body-l text-grey-950">
              Bonjour {user.name}, voici un aperçu de vos projets et tâches
            </p>
          )}
        </div>
        <CreateProjectButton />
      </div>

      <DashboardTasks tasks={tasks} projectNames={projectNames} />
    </div>
  );
}
