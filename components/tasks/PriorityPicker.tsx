import PillRadioGroup from "@/components/ui/PillRadioGroup";
import type { TaskPriority } from "@/lib/tasks";

const OPTIONS: { value: TaskPriority; label: string; className: string }[] = [
  { value: "LOW", label: "Basse", className: "bg-grey-200 text-grey-800" },
  { value: "MEDIUM", label: "Moyenne", className: "bg-info-light text-info" },
  { value: "HIGH", label: "Haute", className: "bg-warning-light text-warning" },
  { value: "URGENT", label: "Urgente", className: "bg-error-light text-error" },
];

type PriorityPickerProps = {
  name: string;
  value: TaskPriority;
  onChange: (value: TaskPriority) => void;
};

export default function PriorityPicker({ name, value, onChange }: PriorityPickerProps) {
  return (
    <PillRadioGroup
      legend="Priorité :"
      name={name}
      options={OPTIONS}
      value={value}
      onChange={onChange}
    />
  );
}
