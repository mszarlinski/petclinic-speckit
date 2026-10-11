import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { usePathname } from "next/navigation"
import { describe, expect, it, vi } from "vitest"
import { Navbar } from "./navbar"

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}))

function mockPathname(pathname: string) {
  vi.mocked(usePathname).mockReturnValue(pathname)
}

describe("Navbar", () => {
  it("renders an Owners trigger distinct from the Home link", () => {
    mockPathname("/")
    render(<Navbar />)

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Owners" })).toBeInTheDocument()
  })

  it("reveals an Add new item linking to /owners/new when the Owners menu is opened", async () => {
    mockPathname("/")
    render(<Navbar />)

    await userEvent.click(screen.getByRole("button", { name: "Owners" }))

    const addNew = await screen.findByRole("menuitem", { name: "Add new" })
    expect(addNew).toHaveAttribute("href", "/owners/new")
  })

  it("marks the Owners trigger active when the current route is under /owners", () => {
    mockPathname("/owners/new")
    render(<Navbar />)

    expect(screen.getByRole("button", { name: "Owners" })).toHaveAttribute(
      "aria-current",
      "page"
    )
  })

  it("does not mark the Owners trigger active outside /owners", () => {
    mockPathname("/")
    render(<Navbar />)

    expect(
      screen.getByRole("button", { name: "Owners" })
    ).not.toHaveAttribute("aria-current")
  })
})
