import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getInitials } from "@/lib/format";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/user";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, expired } = await getSession();
  if (expired) redirect("/logout");
  const initials = user ? getInitials(user.name) : "";

  return (
    <div className="flex min-h-screen flex-col">
      <Header initials={initials} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">{children}</main>
      <Footer />
    </div>
  );
}
