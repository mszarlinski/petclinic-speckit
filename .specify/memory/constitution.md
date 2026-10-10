<!--
Sync Impact Report
Version change: [UNSET TEMPLATE] → 1.0.0 (initial ratification)
Modified principles: n/a (first adoption)
Added sections:
  - Core Principles I–V (Mandatory Full Lifecycle, Behavior-Driven Requirements Translation,
    Non-Negotiable Dual Test Coverage, TypeScript & React Only, Typed Persistence Boundary)
  - Technology Stack Constraints
  - Development Workflow & Quality Gates
  - Governance
Removed sections: none (template placeholders only)
Deferred/TODO items: none — all placeholders resolved from user-supplied decisions
Templates requiring follow-up:
  - .specify/workflows/speckit/workflow.yml — currently only runs specify → plan → tasks →
    implement. Principle I requires clarify/checklist/analyze/converge to also be mandatory
    gated steps. This is a workflow-automation change, outside this command's scope — tracked
    as a Next Action.
-->

# Petclinic Spec Kit Constitution

## Core Principles

### I. Full Lifecycle Compliance (NON-NEGOTIABLE)
Every feature MUST pass through the complete Spec Kit lifecycle, in this order, before its
code is considered mergeable: `/speckit-constitution` (only when principles change) →
`/speckit-specify` → `/speckit-clarify` → `/speckit-plan` → `/speckit-checklist` →
`/speckit-tasks` → `/speckit-analyze` → `/speckit-implement`. `/speckit-converge` MUST be run
after implementation, and again whenever the codebase is suspected to have drifted from its
spec/plan/tasks. Steps that upstream Spec Kit documentation labels "optional enhancement
skills" (`clarify`, `checklist`, `analyze`) are MANDATORY in this project and MUST NOT be
skipped, merged together, or treated as advisory. A step may only be bypassed if the
constitution itself is amended to exempt it.
Rationale: skipping clarify/checklist/analyze is the most common source of spec/code drift;
making every gate mandatory trades a small amount of process overhead for materially lower
rework.

### II. Behavior-Driven Requirements Translation
Requirements enter this project as User Stories with explicit acceptance criteria. Every
acceptance criterion MUST be translated, one-to-one, into a Gherkin scenario (`Given/When/Then`)
captured as a `.feature` file before `/speckit-tasks` runs for that feature. A requirement is
not considered "specified" until it has a corresponding Gherkin scenario; `/speckit-analyze`
MUST flag any functional requirement lacking one as a blocking finding.
Rationale: requirements expressed only as prose drift silently from what the code actually
does; a Gherkin scenario is both a spec artifact and an executable test, closing that gap.

### III. Dual Test Coverage (NON-NEGOTIABLE)
All production code MUST be covered by Vitest unit tests (business logic, utilities, and React
components via Testing Library) AND by Playwright + playwright-bdd behavioral acceptance tests
that execute the Gherkin scenarios from Principle II end-to-end against a running instance of
the application. `/speckit-implement` is not complete for a task until both suites exist and
pass; a task that only adds implementation code without both test layers MUST be reopened.
Rationale: unit tests catch logic regressions fast; BDD acceptance tests verify the user-visible
behavior promised by the originating User Story. Neither substitutes for the other.

### IV. TypeScript & React Only
All application code, frontend and backend, MUST be written in TypeScript with `strict` mode
enabled. The UI MUST be built in React within Next.js (App Router), which also hosts backend
logic via Route Handlers/Server Actions. No alternate UI framework, templating system, or
backend language may be introduced without a constitution amendment.
Rationale: a single full-stack TypeScript codebase removes a class of integration bugs
(serialization mismatches, duplicated validation) and matches the explicit project mandate.

### V. Typed Persistence Boundary
All database access MUST go through Prisma Client against PostgreSQL. Raw SQL is permitted
only via Prisma's typed `$queryRaw`/`$executeRaw` when the query builder genuinely cannot
express the query, and each such use MUST be justified in the feature's plan.
Rationale: keeps the data layer type-safe end-to-end and consistent with the rest of the TS
stack; raw, unreviewed SQL is where type safety and migration discipline tend to erode first.

## Technology Stack Constraints

- **Framework**: Next.js (App Router), React, TypeScript (`strict: true`).
- **Database / ORM**: PostgreSQL, accessed exclusively through Prisma; schema changes ship as
  Prisma migrations.
- **Unit testing**: Vitest + React Testing Library.
- **Behavioral / acceptance testing**: Playwright + playwright-bdd, executing Gherkin
  `.feature` files against a running build of the app.
- **Requirement intake**: User Stories with acceptance criteria, supplied by the product owner,
  captured verbatim in each feature's `spec.md` before translation into Gherkin scenarios.

## Development Workflow & Quality Gates

- The lifecycle order in Principle I is enforced for every feature; a pull request MUST
  reference which spec/plan/tasks artifacts it implements.
- A pull request MUST NOT merge unless: all Vitest unit tests pass, all Playwright/BDD
  acceptance tests pass, and the feature's most recent `/speckit-analyze` run has no
  unresolved CRITICAL or HIGH findings.
- CI (GitHub Actions) MUST run `vitest run` and `playwright test` on every pull request and
  block merge on failure.
- `/speckit-checklist` output MUST be attached to or linked from the pull request that closes
  out the corresponding feature.

## Governance

This constitution supersedes ad-hoc practice for all work in this repository. Amendments
require: (1) a documented rationale for the change, (2) a version bump per the policy below,
and (3) review of any templates, skills, or workflow files that reference the amended
principle. Compliance is checked at each `/speckit-analyze` run and at pull-request review;
reviewers MUST verify lifecycle compliance (Principle I) before approving.

Versioning policy (semantic versioning applied to this document):
- **MAJOR**: backward-incompatible principle removal or redefinition (e.g., dropping a
  mandatory lifecycle gate, changing the required tech stack).
- **MINOR**: a new principle or materially expanded section is added.
- **PATCH**: wording clarifications and non-semantic refinements.

**Version**: 1.0.0 | **Ratified**: 2026-10-10 | **Last Amended**: 2026-10-10
