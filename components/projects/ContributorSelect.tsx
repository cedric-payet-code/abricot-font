"use client";

import { useEffect, useId, useRef, useState } from "react";
import { searchUsers, type UserSearchResult } from "@/app/(main)/projects/actions";
import { ChevronDownIcon } from "@/components/icons/UiIcons";
import Avatar from "@/components/ui/Avatar";

type ContributorSelectProps = {
  name: string;
  value: UserSearchResult[];
  onChange: (value: UserSearchResult[]) => void;
  error?: string;
};

export default function ContributorSelect({
  name,
  value,
  onChange,
  error,
}: ContributorSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const requestRef = useRef(0);
  const baseId = useId();
  const labelId = `${baseId}-label`;
  const panelId = `${baseId}-panel`;
  const searchId = `${baseId}-search`;
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

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery);
    clearTimeout(timerRef.current);
    const search = nextQuery.trim();
    const requestId = ++requestRef.current;
    if (search.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    timerRef.current = setTimeout(async () => {
      const users = await searchUsers(search);
      if (requestId === requestRef.current) {
        setResults(users);
        setLoading(false);
      }
    }, 300);
  }

  function toggle(user: UserSearchResult) {
    onChange(
      value.some((selected) => selected.id === user.id)
        ? value.filter((selected) => selected.id !== user.id)
        : [...value, user]
    );
  }

  const unselectedResults = results.filter(
    (user) => !value.some((selected) => selected.id === user.id)
  );

  const summary =
    value.length === 0
      ? "Choisir un ou plusieurs collaborateurs"
      : `${value.length} ${value.length > 1 ? "collaborateurs" : "collaborateur"}`;

  const hasQuery = query.trim().length >= 2;

  return (
    <div ref={containerRef} className="relative flex flex-col gap-2">
      <span id={labelId} className="text-body-s text-grey-950">
        Contributeurs
      </span>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
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

      {value.map((user) => (
        <input key={user.id} type="hidden" name={name} value={user.email} />
      ))}

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full right-0 left-0 z-10 mt-1 flex max-h-72 flex-col overflow-hidden rounded border border-grey-200 bg-white shadow-lg"
      >
        <div className="border-b border-grey-200 p-3">
          <label htmlFor={searchId} className="sr-only">
            Rechercher un utilisateur
          </label>
          <input
            id={searchId}
            type="search"
            placeholder="Rechercher par nom ou email"
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            className="h-10 w-full rounded border border-grey-200 px-3 text-body-xs text-grey-950 placeholder:text-grey-600 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus-visible:outline-none"
          />
        </div>

        <fieldset className="overflow-y-auto py-2">
          <legend className="sr-only">Collaborateurs</legend>

          {value.map((user) => (
            <UserOption key={user.id} user={user} checked onToggle={toggle} />
          ))}

          {unselectedResults.map((user) => (
            <UserOption key={user.id} user={user} checked={false} onToggle={toggle} />
          ))}

          <p aria-live="polite" className="px-4 py-2 text-body-xs text-grey-600">
            {!hasQuery
              ? "Tapez au moins 2 caractères pour rechercher."
              : loading
                ? "Recherche…"
                : unselectedResults.length === 0
                  ? "Aucun autre utilisateur trouvé."
                  : ""}
          </p>
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

type UserOptionProps = {
  user: UserSearchResult;
  checked: boolean;
  onToggle: (user: UserSearchResult) => void;
};

function UserOption({ user, checked, onToggle }: UserOptionProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 px-4 py-2 text-body-s text-grey-950 hover:bg-grey-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(user)}
        className="h-4 w-4 accent-brand-dark"
      />
      <Avatar name={user.name} />
      <span className="flex flex-col">
        {user.name}
        <span className="text-body-2xs text-grey-600">{user.email}</span>
      </span>
    </label>
  );
}
