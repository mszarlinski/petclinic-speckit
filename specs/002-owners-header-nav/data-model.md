# Phase 1 Data Model: Owners Header Navigation

No new data entities. This feature is UI-only navigation; it adds no Prisma model, migration, or
persisted state (spec.md Key Entities: none).

## Transient UI state (not persisted)

| State | Owner | Notes |
|-------|-------|-------|
| Menu open/closed | `@base-ui/react/menu`'s internal state, hosted by the `Navbar` component | Not persisted across navigations or reloads; resets to closed on route change. |
| Active section (is current route under `/owners`) | Derived from `usePathname()` at render time | Not stored; recomputed from the URL on every render (see research.md §2). |
