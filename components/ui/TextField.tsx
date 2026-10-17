import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  requiredMark?: boolean;
};

export default function TextField({
  id,
  label,
  hint,
  error,
  requiredMark = false,
  ...inputProps
}: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-body-s text-grey-950">
        {label}
        {requiredMark && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`h-[52px] w-full rounded border bg-white px-4 text-body-m text-grey-950 transition-colors hover:border-grey-400 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus-visible:outline-none ${
          error ? "border-error" : "border-grey-200"
        }`}
        {...inputProps}
      />
      {hint && (
        <p id={hintId} className="text-body-xs text-grey-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-body-xs text-error-text">
          {error}
        </p>
      )}
    </div>
  );
}
