import { SearchIcon } from "@/components/icons/UiIcons";

type SearchFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function SearchField({
  id,
  label,
  value,
  onChange,
  className = "",
}: SearchFieldProps) {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[62px] w-full rounded border border-grey-200 bg-white pr-14 pl-8 text-body-s text-grey-950 transition-colors placeholder:text-grey-600 hover:border-grey-400 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus-visible:outline-none"
      />
      <SearchIcon className="pointer-events-none absolute top-1/2 right-8 -translate-y-1/2 text-grey-600" />
    </div>
  );
}
