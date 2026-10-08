"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "@/components/icons/DashboardIcon";
import ProjectsIcon from "@/components/icons/ProjectsIcon";

const links = [
  { href: "/dashboard", label: "Tableau de bord", Icon: DashboardIcon },
  { href: "/projects", label: "Projets", Icon: ProjectsIcon },
];

export default function Header() {
  const pathname = usePathname();
  const isAccountPage = pathname === "/account";

  return (
    <header className="flex items-center justify-between gap-2 bg-white px-4 py-2 md:px-24">
      <Link href="/dashboard" className="shrink-0">
        <Image
          src="/logo-orange.svg"
          alt="Abricot - accueil"
          width={147}
          height={18}
          className="h-auto w-24 md:w-[147px]"
          priority
        />
      </Link>

      <nav aria-label="Navigation principale">
        <ul className="flex items-center gap-2 md:gap-4">
          {links.map(({ href, label, Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex items-center gap-3 rounded-lg p-3 transition-colors duration-300 md:px-10 md:py-4 ${
                    isActive
                      ? "bg-grey-950 text-white"
                      : "text-brand-text hover:bg-grey-950 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`transition-colors duration-300 ${
                      isActive ? "" : "text-brand-dark group-hover:text-white"
                    }`}
                  />
                  <span className="sr-only md:not-sr-only">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Link
        href="/account"
        aria-label="Mon compte"
        aria-current={isAccountPage ? "page" : undefined}
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full md:h-16 md:w-16 text-body-s transition-colors duration-300 ${
          isAccountPage
            ? "bg-brand-dark text-white"
            : "bg-brand-light text-grey-950 hover:text-white hover:bg-brand-dark"
        }`}
      >
        AD
      </Link>
    </header>
  );
}
