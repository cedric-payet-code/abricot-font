import Avatar from "@/components/ui/Avatar";
import type { Project } from "@/lib/projects";

type ProjectContributorsProps = {
  project: Project;
  currentUserId?: string;
};

export default function ProjectContributors({ project, currentUserId }: ProjectContributorsProps) {
  const { owner, members } = project;
  const teamSize = members.length + 1;
  const isOwner = owner.id === currentUserId;

  return (
    <section
      aria-labelledby="contributors-title"
      className="flex flex-col gap-4 rounded-[10px] bg-grey-100 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-12"
    >
      <h2 id="contributors-title" className="text-h5 text-grey-950">
        Contributeurs{" "}
        <span className="text-body-m text-grey-600">
          {teamSize} {teamSize > 1 ? "personnes" : "personne"}
        </span>
      </h2>

      <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
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

        {members.map(({ id, user }) => {
          const isMe = user.id === currentUserId;
          return (
            <li key={id} className="flex items-center gap-1.5">
              <Avatar name={user.name} highlighted={isMe} />
              <span
                className={`rounded-[10px] px-4 py-0.5 text-body-s ${
                  isMe ? "bg-brand-light text-brand-dark" : "bg-grey-200 text-grey-800"
                }`}
              >
                {user.name}
                {isMe && <span className="sr-only"> (vous)</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
