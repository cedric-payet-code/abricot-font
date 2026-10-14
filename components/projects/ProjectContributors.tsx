import Avatar from "@/components/ui/Avatar";
import type { Project } from "@/lib/projects";

type ProjectContributorsProps = {
  project: Project;
};

export default function ProjectContributors({ project }: ProjectContributorsProps) {
  const { owner, members } = project;
  const teamSize = members.length + 1;

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
          <Avatar name={owner.name} highlighted />
          <span
            title={owner.name}
            className="rounded-[10px] bg-brand-light px-4 py-0.5 text-body-s text-brand-dark"
          >
            Propriétaire
          </span>
          <span className="sr-only">: {owner.name}</span>
        </li>

        {members.map(({ id, user }) => {
          return (
            <li key={id} className="flex items-center gap-1.5">
              <Avatar name={user.name} />
              <span className="rounded-[10px] bg-grey-200 px-4 py-0.5 text-body-s text-grey-800">
                {user.name}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
