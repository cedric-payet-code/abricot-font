import Link from "next/link";

export default function NotFoundCard() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 rounded-[10px] border border-grey-200 bg-white px-6 py-12 text-center md:px-14"
    >
      <p className="text-h1 font-semibold text-brand-text">404</p>
      <h1 id="not-found-title" className="text-h5 font-medium text-grey-800">
        Page introuvable
      </h1>
      <p className="text-body-m text-grey-600">
        La page que vous cherchez n&apos;existe pas, a été déplacée ou ne vous est pas accessible.
      </p>
      <Link
        href="/dashboard"
        className="mt-4 flex h-[50px] items-center rounded-[10px] bg-grey-800 px-7 text-body-m text-white transition-colors hover:bg-grey-950"
      >
        Retour au tableau de bord
      </Link>
    </section>
  );
}
