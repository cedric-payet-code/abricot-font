export function getInitials(name?: string) {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function formatShortDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
}

export function formatDateTime(date: string) {
  const value = new Date(date);
  const day = value.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  const time = value.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  return `${day}, ${time}`;
}
