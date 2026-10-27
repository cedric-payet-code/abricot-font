import type { Metadata } from "next";
import CreateProjectButton from "@/components/projects/CreateProjectButton";
import ProjectCard from "@/components/projects/ProjectCard";
import { getProjects, sortProjectsByUrgency, type Project } from "@/lib/projects";
import { getAssignedTasks, getProjectProgress } from "@/lib/tasks";

export const metadata: Metadata = {
  title: "Mes projets | Abricot",
};

export default async function ProjectsPage() {
  let projects: Project[];
  try {
    const [allProjects, assignedTasks] = await Promise.all([
      getProjects(),
      getAssignedTasks().catch(() => []),
    ]);
    projects = sortProjectsByUrgency(allProjects, assignedTasks);
  } catch (error) {
    const message =
      error instanceof Error && error.message !== "fetch failed"
        ? error.message
        : "Le serveur est injoignable. Réessayez plus tard.";
    return (
      <p role="alert" className="text-body-m text-error-text">
        {message}
      </p>
    );
  }

  // Pas de route de progression : une requête de tâches par projet, lancées en parallèle
  const progresses = await Promise.all(projects.map((project) => getProjectProgress(project.id)));

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-h4 text-grey-800">Mes projets</h1>
          <p className="text-body-l text-grey-950">Gérez vos projets</p>
        </div>
        <CreateProjectButton />
      </div>

      {projects.length === 0 ? (
        <p className="mt-16 text-body-m text-grey-600">
          Vous n&apos;avez aucun projet pour le moment.
        </p>
      ) : (
        <ul className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.id}>
              <ProjectCard project={project} progress={progresses[index]} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
