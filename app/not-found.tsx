import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import NotFoundCard from "@/components/layout/NotFoundCard";

export const metadata: Metadata = {
  title: "Page introuvable | Abricot",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex justify-center bg-white px-6 py-8">
        <Image src="/logo-orange.svg" alt="Abricot" width={147} height={19} priority />
      </header>
      <main className="flex w-full flex-1 items-center px-6 py-12">
        <NotFoundCard />
      </main>
      <Footer />
    </div>
  );
}
