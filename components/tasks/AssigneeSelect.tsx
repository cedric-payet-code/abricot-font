"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons/UiIcons";
import Avatar from "@/components/ui/Avatar";

export type Member = {
  id: string;
  name: string;
};

type AssigneeSelectProps = {
  name: string;
  members: Member[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
};

export default function AssigneeSelect({
  name,
  members,
  value,
  onChange,
  error,
}: AssigneeSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const labelId = `${baseId}-label`;
  const listId = `${baseId}-list`;
  const errorId = `${baseId}-error`;

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape, true);
    };
  }, [open]);

  function toggle(memberId: string) {
    onChange(
      value.includes(memberId) ? value.filter((id) => id !== memberId) : [...value, memberId]
    );
  }

  const summary =
    value.length === 0
      ? "Choisir un ou plusieurs collaborateurs"
      : `${value.length} ${value.length > 1 ? "collaborateurs" : "collaborateur"}`;

  return (
    <div ref={containerRef} className="relative flex flex-col gap-2">
      <span id={labelId} className="text-body-s text-grey-950">
        Assigné à :
      </span>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${baseId}-summary`}
        aria-describedby={error ? errorId : undefined}
        onClick={() => setOpen((current) => !current)}
        className={`flex h-[52px] w-full items-center justify-between rounded border bg-white px-4 text-left text-body-xs transition-colors hover:border-grey-400 ${
          value.length === 0 ? "text-grey-600" : "text-grey-950"
        } ${error ? "border-error" : "border-grey-200"}`}
      >
        <span id={`${baseId}-summary`}>{summary}</span>
        <ChevronDownIcon className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {value.map((id) => (
        <input key={id} type="hidden" name={name} value={id} />
      ))}

      <div
        id={listId}
        hidden={!open}
        className="absolute top-full right-0 left-0 z-10 mt-1 max-h-60 overflow-y-auto rounded border border-grey-200 bg-white py-2 shadow-lg"
      >
        <fieldset>
          <legend className="sr-only">Collaborateurs</legend>
          {members.length === 0 ? (
            <p className="px-4 py-2 text-body-xs text-grey-600">Aucun collaborateur.</p>
          ) : (
            members.map((member) => (
              <label
                key={member.id}
                className="flex cursor-pointer items-center gap-3 px-4 py-2 text-body-s text-grey-950 hover:bg-grey-50"
              >
                <input
                  type="checkbox"
                  checked={value.includes(member.id)}
                  onChange={() => toggle(member.id)}
                  className="h-4 w-4 accent-brand-dark"
                />
                <Avatar name={member.name} />
                {member.name}
              </label>
            ))
          )}
        </fieldset>
      </div>

      {error && (
        <p id={errorId} className="text-body-xs text-error-text">
          {error}
        </p>
      )}
    </div>
  );
}
