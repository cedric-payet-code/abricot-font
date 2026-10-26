import type { Progress } from "@/lib/tasks";

type ProgressBarProps = {
  progress: Progress;
  label: string;
};

export default function ProgressBar({ progress, label }: ProgressBarProps) {
  const { done, total } = progress;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-body-xs text-grey-600">
        <span>Progression</span>
        <span className="text-grey-800">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-[7px] w-full overflow-hidden rounded-full bg-grey-200"
      >
        <div className="h-full rounded-full bg-brand-dark" style={{ width: `${percent}%` }} />
      </div>
      <p className="text-body-2xs text-grey-600">
        {done}/{total} {total > 1 ? "tâches terminées" : "tâche terminée"}
      </p>
    </div>
  );
}
