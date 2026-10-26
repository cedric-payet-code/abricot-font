"use client";

import { useState } from "react";
import AssignedTasks from "@/components/dashboard/AssignedTasks";
import KanbanBoard from "@/components/dashboard/KanbanBoard";
import { CalendarIcon, ListIcon } from "@/components/icons/UiIcons";
import type { Task } from "@/lib/tasks";

type View = "list" | "kanban";

type DashboardTasksProps = {
  tasks: Task[] | null;
};

const VIEWS = [
  { value: "list", label: "Liste", Icon: ListIcon },
  { value: "kanban", label: "Kanban", Icon: CalendarIcon },
] as const;

export default function DashboardTasks({ tasks }: DashboardTasksProps) {
  const [view, setView] = useState<View>("list");

  return (
    <>
      <div role="group" aria-label="Affichage des tâches" className="flex gap-2">
        {VIEWS.map(({ value, label, Icon }) => {
          const isActive = view === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setView(value)}
              className={`flex h-[45px] items-center gap-2 rounded-lg px-4 text-body-s text-brand-text transition-colors ${
                isActive ? "bg-brand-light" : "bg-white hover:bg-brand-light"
              }`}
            >
              <Icon className="text-brand-text" />
              {label}
            </button>
          );
        })}
      </div>

      {view === "list" ? <AssignedTasks tasks={tasks} /> : <KanbanBoard tasks={tasks} />}
    </>
  );
}
