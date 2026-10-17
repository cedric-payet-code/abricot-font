type ResultsAnnouncementProps = {
  count: number;
  active: boolean;
};

export default function ResultsAnnouncement({ count, active }: ResultsAnnouncementProps) {
  return (
    <p aria-live="polite" className="sr-only">
      {active && `${count} ${count > 1 ? "tâches trouvées" : "tâche trouvée"}`}
    </p>
  );
}
