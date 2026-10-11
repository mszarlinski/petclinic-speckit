"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PawPrint } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "cn"

export function Navbar() {
  const pathname = usePathname()
  const isOwnersActive = pathname.startsWith("/owners")

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
          <li>
            <Link
              href="/"
              className="block rounded-md px-3 py-1.5 transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Home
            </Link>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-current={isOwnersActive ? "page" : undefined}
                className={cn(
                  isOwnersActive && "bg-primary text-primary-foreground"
                )}
              >
                Owners
              </DropdownMenuTrigger>
              <DropdownMenuPopup>
                <DropdownMenuItem render={<Link href="/owners/new" />}>
                  Add new
                </DropdownMenuItem>
              </DropdownMenuPopup>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    </header>
  )
}
