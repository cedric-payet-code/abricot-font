import Image from "next/image";
import AuthIllustration from "@/components/layout/AuthIllustration";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen md:grid-cols-[39fr_61fr]">
      <div className="flex flex-col items-center px-6 py-16 md:py-24">
        <Image src="/logo-orange.svg" alt="Abricot" width={253} height={33} priority />
        <main className="flex w-full max-w-xs flex-1 flex-col items-center justify-center py-12">
          {children}
        </main>
      </div>
      <AuthIllustration />
    </div>
  );
}
