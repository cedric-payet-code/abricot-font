"use client";

import { useState } from "react";
import AssignedTaskCard from "@/components/tasks/AssignedTaskCard";
import ResultsAnnouncement from "@/components/tasks/ResultsAnnouncement";
import SearchField from "@/components/ui/SearchField";
import { filterTasks } from "@/lib/task-filters";
import type { Task } from "@/lib/tasks";

type AssignedTasksProps = {
  tasks: Task[] | null;
};

export default function AssignedTasks({ tasks }: AssignedTasksProps) {
  const [search, setSearch] = useState("");

  const filteredTasks = filterTasks(tasks ?? [], { search });
  const isFiltering = Boolean(search.trim());

  return (
    <section
      aria-labelledby="assigned-tasks-title"
      className="rounded-[10px] border border-grey-200 bg-white px-6 py-10 md:px-[58px]"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 id="assigned-tasks-title" className="text-h5 text-grey-800">
            Mes tâches assignées
          </h2>
          <p className="text-body-m text-grey-600">Par ordre de priorité</p>
        </div>

        <SearchField
          id="assigned-task-search"
          label="Rechercher une tâche"
          value={search}
          onChange={setSearch}
          className="md:w-[357px]"
        />
      </div>

      <div className="mt-10">
        {tasks === null ? (
          <p role="alert" className="text-body-m text-error-text">
            Impossible de récupérer vos tâches.
          </p>
        ) : tasks.length === 0 ? (
          <p className="text-body-m text-grey-600">Aucune tâche ne vous est assignée.</p>
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
                    <AssignedTaskCard task={task} projectName={task.project?.name} />
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
