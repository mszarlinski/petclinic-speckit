---
description: "Task list for Owners Header Navigation"
---

# Tasks: Owners Header Navigation

**Input**: Design documents from `/specs/002-owners-header-nav/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md (no contracts/ — see
plan.md Project Structure for why)

**Tests**: Constitution Principle III (Dual Test Coverage) is NON-NEGOTIABLE for this project —
Vitest unit tests AND Playwright/playwright-bdd acceptance tests are REQUIRED, not optional. The
Gherkin scenarios required by Principle II already exist at
`tests/bdd/features/owners-header-nav.feature` (translated 1:1 from spec.md's 5 acceptance
scenarios, plus the "re-select Add new" and "owner detail page" edge cases, plus the narrow-viewport
edge case).

**Organization**: This feature has a single user story (US1, P1), so Setup/Foundational hold shared
infrastructure and US1 holds all story-specific work.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1)
- Include exact file paths in descriptions

## Path Conventions

Single Next.js App Router project (see plan.md Project Structure): `src/components/`, `tests/bdd/`
at repository root.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization for this feature.

No setup tasks are required: `@base-ui/react` is already a project dependency (research.md Decision
#1) and this feature introduces no new package, database schema, or migration (data-model.md — no
new entities).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The shared menu primitive that both the Navbar implementation and its tests depend on.

**⚠️ CRITICAL**: No User Story 1 task may begin until this phase is complete.

- [X] T001 Create a shadcn-style `DropdownMenu` primitive in `src/components/ui/dropdown-menu.tsx` using `@base-ui/react/menu` (`Menu.Root`, `Menu.Trigger`, `Menu.Portal`, `Menu.Positioner`, `Menu.Popup`, `Menu.Item`), following the `cva`/`cn`/`data-slot` conventions already used in `src/components/ui/button.tsx` (research.md Decision #1); export `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuPopup` (wraps `Menu.Portal`+`Menu.Positioner`+`Menu.Popup` — canonical name, matches `@base-ui/react/menu`'s own `Menu.Popup`, not `DropdownMenuContent`), and `DropdownMenuItem` wrapper components

**Checkpoint**: Foundation ready — User Story 1 implementation can now begin.

---

## Phase 3: User Story 1 - Discover and reach owner registration from the header (Priority: P1) 🎯 MVP

**Goal**: Clinic staff can open an "Owners" menu in the site header from any page and select "Add
new" to reach the existing `/owners/new` registration form, without ever needing to know or type
that URL; the "Owners" entry stays visible and shows an active state while in the Owners section.

**Independent Test**: Starting from `/`, open the "Owners" menu in the header, select "Add new",
and confirm the registration form at `/owners/new` loads and is fully usable — fully testable
without any other feature existing beyond the already-shipped `001-register-owner` destination
page.

### Tests for User Story 1 (REQUIRED — Constitution Principle III) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation.**

- [X] T002 [US1] Implement the step definitions for all 7 scenarios in `tests/bdd/features/owners-header-nav.feature` inside `tests/bdd/steps/owners-header-nav.steps.ts`: every scenario must start from `page.goto("/")` (or the owner-detail page reached via the header in the "already there" scenario) and interact only with the header's "Owners" trigger / "Add new" item to reach `/owners/new` — per FR-006, never call `page.goto("/owners/new")` directly anywhere in this file. **Do NOT redefine `Given("I am on the homepage", ...)`** — it already exists in `tests/bdd/steps/homepage.steps.ts` and playwright-bdd shares step definitions globally across all files matching `tests/bdd/steps/*.ts`; redefining it causes a duplicate-step-definition build failure. Only add the new `Given("I am on the homepage with a narrow viewport", ...)` step. Implement `"I submit a valid owner registration"` by importing and reusing the existing `fillOwnerForm`/`VALID_OWNER` fixture from `tests/bdd/steps/register-owner.steps.ts` rather than duplicating that logic (add `export` to both in `register-owner.steps.ts`, as they are currently module-private). The narrow-viewport scenario must use `page.setViewportSize({ width: 375, height: 667 })` (iPhone SE-class width) and assert the "Add new" item is visible (not merely present in the DOM) after opening the menu
- [X] T003 [P] [US1] Write Vitest + React Testing Library unit tests for `Navbar` in `src/components/navbar.test.tsx`: renders an "Owners" trigger distinct from the "Home" link (FR-001); opening the "Owners" menu shows an "Add new" menu item whose link target is `/owners/new` (FR-002, FR-003); the "Owners" trigger has an accessible menu role/name and the item is reachable via keyboard open/Enter (FR-005); mock `usePathname` from `next/navigation` to assert `aria-current="page"` and the `bg-primary text-primary-foreground` active classes (research.md Decision #2) are applied to the "Owners" trigger when the current path starts with `/owners` and not otherwise (Scenario 5)

### Implementation for User Story 1

- [X] T004 [US1] Convert `Navbar` to a client component (`"use client"`) in `src/components/navbar.tsx`: replace the current flat `navLinks` "Home"-only list with "Home" plus an "Owners" `DropdownMenuTrigger` (from `src/components/ui/dropdown-menu.tsx`, depends on T001) containing a single `DropdownMenuItem`/`Add new` linking to `/owners/new`; compute whether the current route is under `/owners` via `usePathname()` from `next/navigation` and apply `aria-current="page"` plus the `bg-primary text-primary-foreground` active classes (research.md Decision #2) to the "Owners" trigger in that case (FR-001–FR-005)

**Checkpoint**: User Story 1 is fully functional and independently testable — this is also the full
feature scope for this spec (single user story).

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Verify the dual test coverage gate and the quickstart validation before PR.

- [X] T005 Run `pnpm test:unit` and fix any failures (confirms T003 passes against T004) — 5/5 passing
- [X] T006 Run `pnpm test:bdd` and fix any failures (confirms T002's scenarios pass against T001/T004) — 16/16 passing (required fixing step function arity for 3 steps with two `{string}` captures)
- [X] T007 Run `pnpm lint` and `pnpm typecheck` and fix any issues — both clean (3 benign unused-arg warnings from required-but-unused Cucumber capture groups)
- [X] T008 [P] Execute the manual validation steps in `quickstart.md` and confirm each expected outcome — verified via Playwright against the running dev server

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: None — no tasks in this phase for this feature
- **Foundational (Phase 2)**: No dependencies — BLOCKS User Story 1 (T001 before T002–T004)
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion (T001)
- **Polish (Phase 4)**: Depends on User Story 1 completion (T002–T004)

### Within User Story 1

- Tests (T002, T003) MUST be written and FAIL before implementation (T004)
- T002 and T003 can be written in parallel (different files) but both require T001 to exist first
  (the BDD steps exercise the real menu; the unit test imports the real `Navbar`, which will import
  the new primitive once T004 lands)
- T004 depends on T001 (DropdownMenu primitive) and is informed by T002/T003 failing first

### Parallel Opportunities

- T002 (BDD step definitions) and T003 (Vitest unit tests) can run in parallel — different files
- T008 can run in parallel with T005–T007 (manual vs. automated validation)

---

## Parallel Example: User Story 1 tests

```bash
# Phase 3, tests in parallel (after T001 is done):
Task: "BDD step definitions in tests/bdd/steps/owners-header-nav.steps.ts"
Task: "Vitest unit tests in src/components/navbar.test.tsx"
```

---

## Implementation Strategy

### MVP First (and only) Scope

1. Complete Phase 2: Foundational (T001)
2. Complete Phase 3: User Story 1, tests first (T002–T003), then implementation (T004)
3. Complete Phase 4: Polish — run both test suites, lint/typecheck, and the quickstart checklist
4. This delivers the complete feature: there is only one user story (P1)

## Notes

- [P] tasks = different files, no dependencies
- Verify T002/T003 fail before implementing T004
- Commit after each task or logical group
- Avoid: vague tasks, same-file conflicts (T004 is the only task touching `navbar.tsx`)
