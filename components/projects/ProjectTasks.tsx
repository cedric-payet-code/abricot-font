import { CalendarIcon, ChevronDownIcon, ListIcon, SearchIcon } from "@/components/icons/UiIcons";

export default function ProjectTasks() {
  return (
    <section
      aria-labelledby="tasks-title"
      className="rounded-[10px] border border-grey-200 bg-white px-6 py-10 md:px-[58px] md:pt-12"
    >
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-2">
          <h2 id="tasks-title" className="text-h5 text-grey-950">
            Tâches
          </h2>
          <p className="text-body-m text-grey-600">Par ordre de priorité</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div role="group" aria-label="Affichage des tâches" className="flex gap-2">
            <button
              type="button"
              aria-pressed="true"
              className="flex h-[45px] items-center gap-2 rounded bg-brand-light px-4 text-body-s text-brand-dark"
            >
              <ListIcon className="text-brand-dark" />
              Liste
            </button>
            <button
              type="button"
              aria-pressed="false"
              className="flex h-[45px] items-center gap-2 rounded px-4 text-body-s text-brand-dark transition-colors hover:bg-brand-light"
            >
              <CalendarIcon className="text-brand-dark" />
              Calendrier
            </button>
          </div>

          <div className="relative">
            <label htmlFor="status-filter" className="sr-only">
              Filtrer par statut
            </label>
            <select
              id="status-filter"
              defaultValue=""
              className="h-[62px] w-full appearance-none rounded border border-grey-200 bg-white pr-12 pl-8 text-body-s text-grey-600 transition-colors hover:border-grey-400 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus-visible:outline-none md:w-[152px]"
            >
              <option value="">Statut</option>
              <option value="TODO">À faire</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="DONE">Terminée</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-6 -translate-y-1/2 text-grey-600" />
          </div>

          <div className="relative">
            <label htmlFor="task-search" className="sr-only">
              Rechercher une tâche
            </label>
            <input
              id="task-search"
              type="search"
              placeholder="Rechercher une tâche"
              className="h-[62px] w-full rounded border border-grey-200 bg-white pr-14 pl-8 text-body-s text-grey-950 transition-colors placeholder:text-grey-600 hover:border-grey-400 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus-visible:outline-none md:w-[283px]"
            />
            <SearchIcon className="pointer-events-none absolute top-1/2 right-8 -translate-y-1/2 text-grey-600" />
          </div>
        </div>
      </div>

      <div className="mt-10 min-h-40" />
    </section>
  );
}
