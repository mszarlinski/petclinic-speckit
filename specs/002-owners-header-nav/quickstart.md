# Quickstart: Owners Header Navigation

Validates the feature end-to-end once implemented.

## Prerequisites

- Dependencies installed: `pnpm install`.
- No database changes are required for this feature (see [data-model.md](./data-model.md)); the
  existing `docker compose up -d db` / `pnpm prisma:migrate` setup from `001-register-owner` is only
  needed because `/owners/new` itself persists data, not because of anything added here.

## Manual validation

1. `pnpm dev`
2. Navigate to `http://localhost:3000/`.
3. In the header, locate the "Owners" entry (distinct from "Home").
   - Expect: visible without scrolling, reachable by keyboard (Tab to it, Enter/Space to open).
4. Activate "Owners".
   - Expect: a menu opens showing an "Add new" item (FR-002).
5. Select "Add new".
   - Expect: navigates to `/owners/new` with the existing registration form, unchanged (FR-003).
6. From `/owners/new`, look at the header.
   - Expect: "Owners" shows an active/highlighted state (FR-004, Scenario 5).
7. Submit the registration form, land on `/owners/<id>`, and check the header again.
   - Expect: "Owners" entry is still present and still shows active state (Edge case:
     `/owners/[id]`).
8. Resize the browser to a narrow/mobile width and repeat steps 3–5.
   - Expect: "Add new" remains reachable and fully visible when the menu opens (Edge case: narrow
     viewports).

## Automated validation

- `pnpm test:unit` — Vitest + Testing Library coverage for `Navbar` (menu renders, "Add new" link
  points at `/owners/new`, active state reflects the current route).
- `pnpm test:bdd` — Playwright/playwright-bdd scenario(s) in
  `tests/bdd/features/owners-header-nav.feature`, translated 1:1 from spec.md's acceptance
  scenarios, driven from `tests/bdd/steps/owners-header-nav.steps.ts`. Per FR-006, these steps start
  at `/` and reach `/owners/new` only via the header controls — never `page.goto("/owners/new")`
  directly.
- `pnpm test` — runs both suites plus a production build, matching CI.

See [research.md](./research.md) for why `@base-ui/react/menu` was chosen and why the acceptance
test must enter through the header rather than the destination route.
