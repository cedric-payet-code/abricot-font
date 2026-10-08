import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between bg-white px-6 py-6 md:px-14">
      <Image src="/logo-black.svg" alt="Abricot" width={101} height={13} />
      <p className="text-body-m">Abricot 2025</p>
    </footer>
  );
}
