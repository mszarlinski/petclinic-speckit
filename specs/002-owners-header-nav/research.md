# Phase 0 Research: Owners Header Navigation

## 1. Menu/dropdown implementation

**Decision**: Build a new `DropdownMenu` family component at `src/components/ui/dropdown-menu.tsx`
using `@base-ui/react/menu` primitives (`Menu.Root`, `Menu.Trigger`, `Menu.Portal`,
`Menu.Positioner`, `Menu.Popup`, `Menu.Item`), styled with the same `cva` + `cn` + `data-slot`
conventions as the existing `button.tsx`/`input.tsx`/`label.tsx` primitives.

**Rationale**: `@base-ui/react` is already a project dependency and is the primitive library the
existing shadcn-style components (`components.json` `"style": "base-nova"`) are built on — no new
dependency is needed. `@base-ui/react/menu` provides correct `menu`/`menuitem` ARIA roles,
Enter/Space-to-open, Arrow-key item navigation, and Escape-to-dismiss out of the box, satisfying
FR-005 without hand-rolled keyboard handling.

**Alternatives considered**:
- `@base-ui/react/navigation-menu` — designed for richer, often multi-column site navigation with
  several top-level sections; overkill for one trigger exposing a single "Add new" item, rejected.
- Hand-rolled `<details>`/`<summary>` or a plain `useState` show/hide `<div>` — rejected: doesn't
  give `menu`/`menuitem` roles or arrow-key/Escape handling for free, so FR-005 would need to be
  reimplemented by hand and re-tested, duplicating what `@base-ui/react/menu` already does.
- Pulling shadcn's default `dropdown-menu` block via the shadcn CLI — rejected: the public shadcn
  registry's default dropdown-menu targets Radix primitives, not `@base-ui/react`; it would pull in
  a second, unused menu library and diverge from this project's `base-nova` (base-ui) component
  style.

## 2. "Owners" active/highlighted state while in the Owners section (Scenario 5)

**Decision**: Convert `Navbar` to a client component (`"use client"`) and use `usePathname()` from
`next/navigation` to detect when the current route starts with `/owners`, applying `aria-current="page"`
plus the same visual treatment the trigger already uses for its own hover state —
`bg-primary text-primary-foreground` (currently only applied via `hover:`/`focus:` on the nav links
in `navbar.tsx`) — applied unconditionally (not just on hover/focus) while active, so "active"
reuses an existing visual language instead of introducing a new one.

**Rationale**: `usePathname()` is the standard App Router way to read the current route in a client
component; the Navbar already needs to become a client component to host the interactive menu
trigger (FR-002), so no extra server/client boundary is introduced beyond what the menu already
requires.

**Alternatives considered**: Passing the current path down from each page/layout as a prop —
rejected, needlessly threads routing state through every page when `usePathname()` reads it
directly where it's needed.

## 3. Mobile / narrow-viewport behavior (Edge Case)

**Decision**: Rely on `@base-ui/react/menu`'s `Menu.Positioner`, which performs collision-aware
placement automatically, to keep the opened "Add new" menu item on-screen at any viewport width.
No separate hamburger/drawer mobile navigation is introduced.

**Rationale**: The spec's Assumptions state this feature is purely additive to the existing header
(no broader nav redesign requested), and the current header has no existing responsive
hamburger/drawer pattern to extend. The edge case requirement is "the action MUST remain
reachable," which collision-aware positioning satisfies without scope creep into a full responsive
nav overhaul.

**Alternatives considered**: Building a hamburger/drawer mobile nav — rejected as out of scope for
a single added menu entry; would be justified only once there are enough header items to warrant
collapsing them.

## 4. Acceptance-test entry point (FR-006 / SC-003)

**Decision**: The new Gherkin feature's `Given` step starts at the home page (`page.goto("/")`,
matching the existing `homepage.feature` pattern) and every subsequent step interacts only with the
header ("Owners" trigger, then "Add new" item) to reach `/owners/new` — never `page.goto("/owners/new")`
directly within this feature's steps.

**Rationale**: Directly requested by the user during spec intake: the existing
`register-owner.feature` steps call `page.goto("/owners/new")` directly, so they would not have
caught the original discoverability gap. This feature's acceptance test must fail if the header
entry point disappears or is mislabeled, which only holds if the test never bypasses it.

**Alternatives considered**: Reusing/modifying the existing `register-owner.feature` Given steps to
navigate via the header — rejected: that feature's scope is the registration form's own behavior
(validation, persistence) and should stay decoupled from navigation discoverability, which is this
feature's concern per Constitution Principle II (one Gherkin file per feature's acceptance
criteria).
