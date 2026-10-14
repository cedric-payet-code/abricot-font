import Link from "next/link";
import ProgressBar from "@/components/projects/ProgressBar";
import Avatar from "@/components/ui/Avatar";
import type { Project } from "@/lib/projects";
import type { Progress } from "@/lib/tasks";

type ProjectCardProps = {
  project: Project;
  currentUserId?: string;
  progress: Progress | null;
};

export default function ProjectCard({ project, currentUserId, progress }: ProjectCardProps) {
  const { id, name, description, owner, members } = project;
  const teamSize = members.length + 1;
  const isOwner = owner.id === currentUserId;

  return (
    <article className="h-full">
      <Link
        href={`/projects/${id}`}
        className="flex h-full flex-col gap-2 rounded-[10px] border border-grey-200 bg-white p-8 transition-colors hover:border-grey-400"
      >
        <h2 className="text-h5 text-grey-950">{name}</h2>
        {description && <p className="text-body-s text-grey-600">{description}</p>}

        <div className="mt-auto flex flex-col gap-12 pt-10">
          {progress && <ProgressBar progress={progress} label={`Progression du projet ${name}`} />}

          <div className="flex flex-col gap-3">
            <p className="text-body-xs text-grey-600">Équipe ({teamSize})</p>

            <ul className="flex flex-wrap items-center" aria-label={`Équipe du projet ${name}`}>
              <li className="flex items-center gap-1.5">
                <Avatar name={owner.name} highlighted={isOwner} />
                <span
                  title={owner.name}
                  className={`rounded-[10px] px-4 py-0.5 text-body-s ${
                    isOwner ? "bg-brand-light text-brand-dark" : "bg-grey-200 text-grey-800"
                  }`}
                >
                  Propriétaire
                </span>
                <span className="sr-only">: {isOwner ? "vous" : owner.name}</span>
              </li>
              {members.map((member, index) => (
                <li key={member.id} className={index === 0 ? "ml-1.5" : "-ml-1.5"}>
                  <Avatar
                    name={member.user.name}
                    highlighted={member.user.id === currentUserId}
                    className="ring-2 ring-white"
                  />
                  <span className="sr-only">
                    {member.user.id === currentUserId ? "Vous" : member.user.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </article>
  );
}
