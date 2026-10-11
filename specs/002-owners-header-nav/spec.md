# Feature Specification: Owners Header Navigation

**Feature Branch**: `002-owners-header-nav`

**Created**: 2026-10-10

**Status**: Draft

**Input**: User description: "Add header navigation for Owners: a 'Owners' entry in the site header that provides an 'Add new' action/link, taking the user to the existing owner registration page (/owners/new). This closes the gap where /owners/new is currently only reachable by typing the URL directly."

## Clarifications

### Session 2026-10-10

- Q: Should "Owners" in the header be a single direct link that goes straight to the registration
  form, or a menu/dropdown that reveals "Add new" as a sub-item? → A: Menu/dropdown — "Owners"
  opens a menu, "Add new" is the item inside it.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover and reach owner registration from the header (Priority: P1)

A clinic staff member viewing any page of the application wants to register a new owner. Today
the only way to do this is to already know and type the `/owners/new` URL directly — there is no
link anywhere in the UI. This story adds an "Owners" entry to the site header with an "Add new"
action that navigates to the existing owner registration page, so the feature is discoverable
without prior knowledge of the URL.

**Why this priority**: This is the entire scope of the feature and the only story — it directly
closes the discoverability gap described in the feature input. Without it, the owner registration
page built in a prior feature remains effectively hidden from real users.

**Independent Test**: Starting from the home page with no URL knowledge, a user can locate the
"Owners" entry in the header, choose "Add new", land on the owner registration form, and confirm
it is the same form reachable at `/owners/new`. Delivers value on its own: owner registration
becomes reachable through normal UI navigation.

**Acceptance Scenarios**:

1. **Given** a user is on the home page, **When** they look at the site header, **Then** they see
   an "Owners" navigation entry (distinct from "Home").
2. **Given** a user is on any page with the site header visible, **When** they open the "Owners"
   menu in the header, **Then** an "Add new" menu item is presented inside it.
3. **Given** a user selects "Add new" under "Owners", **When** the action completes, **Then** they
   land on the owner registration page (`/owners/new`) with the registration form ready to fill in.
4. **Given** a user has never been told the `/owners/new` URL, **When** they use only the header
   navigation starting from the home page, **Then** they can reach and successfully submit the
   owner registration form without typing any URL directly.
5. **Given** a user is on the owner registration page reached via the header, **When** they look at
   the header, **Then** the "Owners" entry visibly reflects that they are in the Owners section
   (e.g. an active/highlighted state), so navigation context is not lost.

### Edge Cases

- What happens when a user is already on `/owners/new` and clicks "Add new" again? The form MUST
  remain available in its default (empty) state — no duplicate registration or error.
- How does the header behave on narrow/mobile viewports where there may not be room for an
  expanded menu? The "Owners" entry and its "Add new" action MUST remain reachable (e.g. via a
  responsive menu), not silently dropped.
- What happens when a user navigates to the owner detail page (`/owners/[id]`)? The header MUST
  still render with the same "Owners" entry available, preserving the ability to add another
  owner from anywhere in the app.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site header MUST display an "Owners" navigation entry on every page, alongside
  the existing "Home" entry.
- **FR-002**: The "Owners" entry MUST be a menu/dropdown trigger that, when opened, reveals an
  "Add new" menu item; both opening the menu and selecting the item MUST work via normal pointer
  and keyboard interaction (no hidden/undocumented URLs required).
- **FR-003**: Selecting "Add new" MUST navigate the user to the existing owner registration page
  (`/owners/new`) without altering that page's existing form behavior.
- **FR-004**: The header navigation MUST be present and functional on every page that currently
  renders the shared header (home, owner registration, owner detail), so the entry point is never
  lost mid-navigation.
- **FR-005**: The "Owners" menu trigger and its "Add new" item MUST be reachable via keyboard
  (open on Enter/Space, navigate items with arrow keys, dismiss on Escape) and exposed with
  accessible menu roles/names for assistive technology (no mouse-only interaction).
- **FR-006**: Acceptance testing for this feature MUST verify discoverability by starting from the
  header navigation control and following it to the registration form, rather than by navigating
  directly to the registration page's address — so passing tests actually prove the entry point is
  discoverable, not just that the destination page still works.

### Key Entities

*(None — this feature adds navigation UI only; it introduces no new data entities.)*

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user with no prior knowledge of the `/owners/new` URL can reach the owner
  registration form in 2 interactions or fewer from the home page (e.g. click "Owners", click
  "Add new").
- **SC-002**: 100% of pages that currently render the shared site header continue to expose the
  "Owners" → "Add new" path after this change.
- **SC-003**: The automated acceptance test suite includes at least one scenario that reaches the
  registration form exclusively through header navigation, and that scenario fails if the header
  entry is removed or mislabeled (i.e., it does not pass by coincidentally hitting the registration
  page's address directly).

## Assumptions

- "Owners" is additive to the existing header navigation (`Home` stays); no existing links are
  removed or renamed.
- No owner-listing page exists yet and building one is out of scope — "Add new" is the only action
  under "Owners" for this feature. A future feature may add a list/search entry under the same
  "Owners" grouping.
- No new authentication/authorization gate is introduced — anyone who could already reach
  `/owners/new` by typing the URL can still reach it via the header.
