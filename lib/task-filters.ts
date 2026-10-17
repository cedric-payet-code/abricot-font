import type { Task, TaskStatus } from "@/lib/tasks";

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

type TaskFilters = {
  search: string;
  status?: TaskStatus | "";
};

export function filterTasks(tasks: Task[], { search, status }: TaskFilters) {
  const query = normalize(search.trim());

  return tasks.filter((task) => {
    const matchesStatus = !status || task.status === status;
    const matchesSearch =
      !query || normalize(`${task.title} ${task.description ?? ""}`).includes(query);
    return matchesStatus && matchesSearch;
  });
}
