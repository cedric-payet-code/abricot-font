import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-h2">Page introuvable</h1>
      <p className="text-body-m text-grey-600">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/dashboard"
        className="rounded-lg bg-grey-800 px-6 py-3 text-white transition-colors hover:bg-grey-950"
      >
        Retour au tableau de bord
      </Link>
    </main>
  );
}
