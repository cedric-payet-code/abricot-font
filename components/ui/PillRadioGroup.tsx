type PillOption<T extends string> = {
  value: T;
  label: string;
  className: string;
};

type PillRadioGroupProps<T extends string> = {
  legend: string;
  name: string;
  options: PillOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export default function PillRadioGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: PillRadioGroupProps<T>) {
  return (
    <fieldset className="flex flex-col">
      <legend className="mb-3 text-body-s text-grey-950">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={`cursor-pointer rounded-[10px] border-2 px-4 py-0.5 text-body-s transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-dark ${
                option.className
              } ${checked ? "border-current" : "border-transparent"}`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
