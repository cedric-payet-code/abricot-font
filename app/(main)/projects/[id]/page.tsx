import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectContributors from "@/components/projects/ProjectContributors";
import ProjectTasks from "@/components/projects/ProjectTasks";
import { getProjects } from "@/lib/projects";
import { getProjectTasks, sortByPriority } from "@/lib/tasks";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

async function getProject(id: string) {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id).catch(() => undefined);
  return { title: `${project?.name ?? "Projet"} | Abricot` };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  let project;
  try {
    project = await getProject(id);
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

  if (!project) notFound();

  const canEdit = project.userRole === "ADMIN";
  const tasks = await getProjectTasks(id)
    .then(sortByPriority)
    .catch(() => null);

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4 md:gap-5">
          <Link
            href="/projects"
            aria-label="Retour aux projets"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] border border-grey-200 bg-white text-grey-950 transition-colors hover:border-grey-400"
          >
            <span aria-hidden="true" className="text-h5">
              ←
            </span>
          </Link>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h1 className="text-h4 text-grey-950">{project.name}</h1>
              {canEdit && (
                <button
                  type="button"
                  className="text-body-s text-brand-dark underline underline-offset-2 hover:text-grey-950"
                >
                  Modifier
                </button>
              )}
            </div>
            {project.description && (
              <p className="text-body-l text-grey-600">{project.description}</p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            className="h-[50px] rounded-[10px] bg-grey-800 px-3 text-body-m text-white transition-colors hover:bg-grey-950"
          >
            Créer une tâche
          </button>
          <button
            type="button"
            className="flex h-[50px] items-center gap-2 rounded-[10px] bg-brand-dark px-6 text-body-m text-white"
          >
            <span aria-hidden="true">✦</span>
            IA
          </button>
        </div>
      </div>

      <ProjectContributors project={project} />

      <ProjectTasks tasks={tasks} />
    </div>
  );
}
