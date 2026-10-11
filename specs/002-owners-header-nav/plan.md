# Implementation Plan: Owners Header Navigation

**Branch**: `002-owners-header-nav` | **Date**: 2026-10-10 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-owners-header-nav/spec.md`

## Summary

The header currently exposes only a "Home" link, so the existing owner-registration page
(`/owners/new`) is reachable only by typing its URL directly. This feature adds an "Owners" menu
entry to the shared site header that opens a dropdown containing a single "Add new" item,
navigating to the existing `/owners/new` form. Technical approach: convert the existing `Navbar`
client-side, add a new `DropdownMenu` UI primitive built on `@base-ui/react/menu` (already a
dependency, matching the project's base-ui-flavored shadcn style), and use `usePathname()` to show
an active state while under `/owners`. No new data, API, or persistence changes.

## Technical Context

**Language/Version**: TypeScript 5 (`strict: true`), Next.js 16 (App Router), React 19

**Primary Dependencies**: Next.js, React, `@base-ui/react` (menu primitive — already a dependency,
no new package), Tailwind CSS

**Storage**: N/A — no persistence changes (see [data-model.md](./data-model.md))

**Testing**: Vitest + React Testing Library (`Navbar` component behavior), Playwright +
playwright-bdd (end-to-end acceptance test executing the Gherkin scenarios from spec.md, entering
via the header per FR-006)

**Target Platform**: Web application, server-rendered by Next.js, self-hosted via Docker (unchanged)

**Project Type**: Single full-stack Next.js web application (existing scaffold — no separate
frontend/backend projects)

**Performance Goals**: No special targets beyond standard interactive web responsiveness; SC-001
(reach the form in 2 interactions or fewer) is a usability target, not a latency SLA

**Constraints**: All UI/backend logic MUST be TypeScript/React/Next.js (Principle IV); the menu
MUST satisfy keyboard/accessible-name requirements (FR-005) without introducing a second menu
library alongside `@base-ui/react`

**Scale/Scope**: Single header component change plus one new UI primitive; no concurrency, scale,
or data-volume considerations apply

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Full Lifecycle Compliance)**: This plan follows `/speckit-specify` and
  `/speckit-clarify` (one clarification resolved: menu/dropdown, not a direct link).
  `/speckit-checklist`, `/speckit-tasks`, `/speckit-analyze`, and `/speckit-implement` remain to be
  run in order. PASS (in progress, on track).
- **Principle II (Behavior-Driven Requirements Translation)**: Every acceptance scenario in spec.md
  (5 scenarios) will be translated 1:1 into Gherkin in a new
  `tests/bdd/features/owners-header-nav.feature` during `/speckit-tasks`, before implementation.
  PASS (planned, not yet executed — tracked as a task).
- **Principle III (Dual Test Coverage)**: Plan allocates both a Vitest suite (`Navbar` rendering,
  menu item target, active-state logic) and a Playwright/playwright-bdd suite (the Gherkin
  scenarios above, entering via the header per FR-006/research.md §4). PASS.
- **Principle IV (TypeScript & React Only)**: Feature is implemented entirely as TypeScript React
  components; no alternate framework or backend language introduced. PASS.
- **Principle V (Typed Persistence Boundary)**: Not applicable — this feature performs no database
  access. PASS (N/A).

No violations identified. Complexity Tracking table is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/002-owners-header-nav/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── checklists/
│   └── requirements.md  # Spec quality checklist (/speckit-specify command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

No `contracts/` directory: this feature introduces no API, Server Action, or other external
interface — it only composes existing UI primitives and links to the already-contracted
`/owners/new` route from `001-register-owner`.

### Source Code (repository root)

```text
src/
├── components/
│   ├── navbar.tsx                 # modified: "use client", add Owners menu trigger + active state
│   ├── navbar.test.tsx            # new: Vitest + Testing Library coverage
│   └── ui/
│       └── dropdown-menu.tsx      # new: shadcn-style wrapper over @base-ui/react/menu

tests/
└── bdd/
    ├── features/
    │   └── owners-header-nav.feature   # new
    └── steps/
        └── owners-header-nav.steps.ts  # new
```

**Structure Decision**: Single Next.js App Router application (the existing scaffold, unchanged
from `001-register-owner`). The new menu primitive is colocated with the other shadcn-style
primitives in `src/components/ui/`, and the header itself stays at `src/components/navbar.tsx`
where it already lives — no new top-level directories are introduced.

## Complexity Tracking

*No Constitution Check violations — table not applicable.*
