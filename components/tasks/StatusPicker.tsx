import PillRadioGroup from "@/components/ui/PillRadioGroup";
import type { TaskStatus } from "@/lib/tasks";

const OPTIONS: { value: TaskStatus; label: string; className: string }[] = [
  { value: "TODO", label: "À faire", className: "bg-error-light text-error-text" },
  { value: "IN_PROGRESS", label: "En cours", className: "bg-warning-light text-warning-text" },
  { value: "DONE", label: "Terminée", className: "bg-success-light text-success-text" },
];

type StatusPickerProps = {
  name: string;
  value: TaskStatus;
  onChange: (value: TaskStatus) => void;
};

export default function StatusPicker({ name, value, onChange }: StatusPickerProps) {
  return (
    <PillRadioGroup
      legend="Statut :"
      name={name}
      options={OPTIONS}
      value={value}
      onChange={onChange}
    />
  );
}
