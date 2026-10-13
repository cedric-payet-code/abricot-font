import { getInitials } from "@/lib/format";

type AvatarProps = {
  name: string;
  highlighted?: boolean;
  className?: string;
};

export default function Avatar({ name, highlighted = false, className = "" }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      title={name}
      className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-body-2xs text-grey-950 ring-2 ring-white ${
        highlighted ? "bg-brand-light" : "bg-grey-200"
      } ${className}`}
    >
      {getInitials(name)}
    </span>
  );
}
