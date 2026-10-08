"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthIllustration() {
  const pathname = usePathname();
  const src = pathname === "/register" ? "/auth-register.jpg" : "/auth-login.jpg";

  return (
    <div className="relative hidden md:block">
      <Image src={src} alt="" fill sizes="61vw" className="object-cover" priority />
    </div>
  );
}
