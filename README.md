# Petclinic

A pet clinic management application, built spec-first with [GitHub Spec Kit](https://github.com/github/spec-kit).

## Process

This repo's development process is governed by `.specify/memory/constitution.md`. In short:
every feature goes through the full Spec Kit lifecycle —
`/speckit-specify` → `/speckit-clarify` → `/speckit-plan` → `/speckit-checklist` →
`/speckit-tasks` → `/speckit-analyze` → `/speckit-implement` → `/speckit-converge` — with no
step skipped. Requirements arrive as User Stories, get translated into Gherkin `.feature`
scenarios, and ship with both unit and behavioral acceptance test coverage. See the
constitution for the full rationale and quality gates.

## Stack

- Next.js (App Router) + React + TypeScript (`strict`)
- PostgreSQL + Prisma
- Tailwind CSS + shadcn/ui
- Vitest + React Testing Library (unit tests)
- Playwright + playwright-bdd (Gherkin-driven behavioral acceptance tests)
- pnpm, Docker (self-hosted deployment)

## Getting started

```bash
pnpm install
cp .env.example .env   # adjust if not using the default docker-compose db
docker compose up -d db
pnpm prisma:migrate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

```bash
pnpm test:unit   # Vitest
pnpm test:bdd    # Gherkin scenarios in tests/bdd/features, via Playwright
pnpm test        # unit + build + bdd, same as CI
```

## Running with Docker

```bash
docker compose up --build
```

Builds the app via the multi-stage `Dockerfile` (Next.js `standalone` output) alongside a
PostgreSQL container.
