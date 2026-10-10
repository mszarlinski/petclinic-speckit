import Link from "next/link";
import { PawPrint } from "lucide-react";

const navLinks = [{ href: "/", label: "Home" }];

export function Navbar() {
  return (
    <header className="bg-secondary text-secondary-foreground">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <PawPrint className="size-5 text-primary" aria-hidden />
          PetClinic
        </Link>
        <ul className="flex items-center gap-1 text-sm">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-md px-3 py-1.5 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
