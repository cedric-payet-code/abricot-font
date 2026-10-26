"use client";

import { useState } from "react";
import { CalendarIcon, ChevronDownIcon, ListIcon } from "@/components/icons/UiIcons";
import type { Member } from "@/components/tasks/AssigneeSelect";
import ResultsAnnouncement from "@/components/tasks/ResultsAnnouncement";
import TaskCard from "@/components/tasks/TaskCard";
import SearchField from "@/components/ui/SearchField";
import { filterTasks } from "@/lib/task-filters";
import type { Task, TaskStatus } from "@/lib/tasks";

type ProjectTasksProps = {
  tasks: Task[] | null;
  projectId: string;
  currentUserName?: string;
  members: Member[];
};

export default function ProjectTasks({
  tasks,
  projectId,
  members,
  currentUserName,
}: ProjectTasksProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TaskStatus | "">("");

  const filteredTasks = filterTasks(tasks ?? [], { search, status });
  const isFiltering = Boolean(search.trim() || status);

  return (
    <section
      aria-labelledby="tasks-title"
      className="rounded-[10px] border border-grey-200 bg-white px-6 py-10 md:px-[58px] md:pt-12"
    >
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-2">
          <h2 id="tasks-title" className="text-h5 text-grey-800">
            Tâches
          </h2>
          <p className="text-body-m text-grey-600">Par ordre de priorité</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div role="group" aria-label="Affichage des tâches" className="flex gap-2">
            <button
              type="button"
              aria-pressed="true"
              className="flex h-[45px] items-center gap-2 rounded-lg bg-brand-light px-4 text-body-s text-brand-text"
            >
              <ListIcon className="text-brand-text" />
              Liste
            </button>
            <button
              type="button"
              aria-pressed="false"
              className="flex h-[45px] items-center gap-2 rounded-lg px-4 text-body-s text-brand-text transition-colors hover:bg-brand-light"
            >
              <CalendarIcon className="text-brand-text" />
              Calendrier
            </button>
          </div>

          <div className="relative">
            <label htmlFor="status-filter" className="sr-only">
              Filtrer par statut
            </label>
            <select
              id="status-filter"
              value={status}
              onChange={(event) => setStatus(event.target.value as TaskStatus | "")}
              className="h-[62px] w-full appearance-none rounded border border-grey-200 bg-white pr-12 pl-8 text-body-s text-grey-600 transition-colors hover:border-grey-400 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus-visible:outline-none md:w-[152px]"
            >
              <option value="">Statut</option>
              <option value="TODO">À faire</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="DONE">Terminée</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-6 -translate-y-1/2 text-grey-600" />
          </div>

          <SearchField
            id="task-search"
            label="Rechercher une tâche"
            value={search}
            onChange={setSearch}
            className="md:w-[283px]"
          />
        </div>
      </div>

      <div className="mt-10">
        {tasks === null ? (
          <p role="alert" className="text-body-m text-error-text">
            Impossible de récupérer les tâches de ce projet.
          </p>
        ) : tasks.length === 0 ? (
          <p className="text-body-m text-grey-600">Aucune tâche pour le moment.</p>
        ) : (
          <>
            <ResultsAnnouncement count={filteredTasks.length} active={isFiltering} />
            {filteredTasks.length === 0 ? (
              <p className="text-body-m text-grey-600">
                Aucune tâche ne correspond à votre recherche.
              </p>
            ) : (
              <ul className="flex flex-col gap-4">
                {filteredTasks.map((task) => (
                  <li key={task.id}>
                    <TaskCard
                      task={task}
                      projectId={projectId}
                      members={members}
                      currentUserName={currentUserName}
                    />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}
