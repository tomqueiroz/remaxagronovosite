# CRM Website Guide

Read this file after the project root `AGENTS.md`. The root guide remains authoritative for the standard self-host React/Hono Website architecture. This guide overrides it only for CRM identity, shared business data, local administrator authentication, Workspace impact review, and release safety.

## Required Execution Order

Do not start implementation until steps 1 through 4 are complete.

1. Read the Workspace-root `.skywork/web-apps.json` and locate this project as the unique `webApps[]` entry whose `type` is `crm`. Treat missing legacy `type` as `website` and missing `name` as `websiteId`.
2. Read this project's root `AGENTS.md`, `.skywork/website.json`, `.skywork/crm/templates/runtime-contract.json`, and scenario catalog.
3. Inspect every `type=website` project listed in the Workspace registry. For each source, always read its root `AGENTS.md`, `.skywork/website.json`, `apps/server/db` schema, ordered migrations, and the shared auth/session/guard chain (`apps/server/_core/auth.ts`, `apps/server/_core/route-helpers.ts`, `apps/server/middlewares/with-session.ts`); these establish table ownership, project conventions, and the cross-cutting authorization surface. Then read only the services and routes that own the business tables CRM can manage, and confirm the gate and preconditions at the route entrypoint of every mutation and non-public read CRM may bind. Keep test and customer-facing-flow reads targeted to one entity, and read them whenever they are the only executable evidence for an invariant — primary keys, status transitions, money/time semantics, archive rules, authorization, or tenant/source isolation — or for a negative case; do not record a registry invariant without such evidence. Do not bulk-read whole `services/`, `routes/`, or test directories to relearn conventions the source root `AGENTS.md` already documents.
4. Select the closest catalog scenario, record its ID in `.skywork/crm/selection.json`, then read `apps/client/src/crm/foundation/index.ts`, that scenario's `contract.json`, `ui-profile.json`, `ui-reference/fixture.json`, and `ui-reference/CrmScenarioReference.tsx`. Listing a scenario directory or a shared UI-reference path is not a substitute for these reads.
5. Build the server-only source registry and typed adapters, then implement the CRM Website.
6. Complete local Workspace impact validation before any deployment.

Stop and report a blocker when the Workspace has more than one CRM, has no ordinary Website, a registered project path escapes the Workspace, current Website code cannot be read, or Website migrations conflict during local replay.

## Project And Source Identity

- The CRM is a complete Website at `/`; never generate `/__skywork/crm/`, an iframe shell, or a CRM-specific CLI command family.
- `.skywork/web-apps.json` is authoritative for App identity and display names. Never infer CRM or source identity from the current directory name.
- Use registry `websiteId` as the stable source key. Use `name` only as display metadata.
- Write the only machine-readable source inventory at `apps/server/crm/source-registry.json`. Validate it against `.skywork/crm/templates/source-registry.schema.json`; do not create `.skywork/crm/source-bindings.json` or a second source inventory.
- The registry must contain exactly one `supported` or `unsupported` decision for every ordinary Website in `.skywork/web-apps.json`, with matching `websiteId` and `name`. At least one source must be supported.
- Generate one typed adapter at `apps/server/crm/adapters/<websiteId>.ts` for every supported source. CRM server code and the Inspector read the same registry; browser code must never import or serve it.
- Runtime requests never scan sibling source trees. Re-read sibling code only during generation, update, and validation.

## Shared Business Data

- Website projects own products, customers, orders, inventory, reservations, entitlements, deliveries, and all other business facts.
- Reuse Website-owned tables in the Workspace shared database. CRM migrations must not copy, rename, alter, or drop Website-owned tables.
- CRM services own operator-side authorization, relationship validation, lifecycle transitions, inventory or capacity constraints, money and time rules, archive behavior, and workflow tests. They execute source reads and mutations through typed adapters against the Workspace shared database.
- A typed adapter maps CRM service operations to its source Website-owned tables and preserves that Website's current primary keys and column meanings. It must not create, alter, drop, copy, or rename Website-owned tables.
- Aggregate reads may call all supported adapters. Single-Website reads call one adapter.
- Every query result exposes `sourceWebsiteId` and `sourceName`.
- Every mutation targets exactly one supported `sourceWebsiteId`; `source=all` mutations are forbidden.
- The browser may submit a source Website ID, but never a table name, project path, Workspace ID, database namespace, database credential, or SQL.
- UI fixtures are design and test inputs only. Never use them as a runtime repository, production seed, or fallback when database access fails.
- `apps/client/src/crm/foundation` is the shared UI Foundation. It owns only visual composition: shell, responsive navigation, toolbar, metric grid, charts, table, and pagination. It must not own fixture data, API endpoints, table/schema names, source ownership, or business state machines.
- Before writing client code, map supported source-registry capabilities to the selected `ui-profile.json` module order. Compose Foundation components in the route, and keep API queries, typed-adapter view models, state transitions, and callbacks in `apps/client/src/crm/modules` or a sibling CRM bindings layer.
- Do not import `ui-reference/fixture.json` from runtime code and do not fork Foundation JSX for one CRM. Change Foundation only for an explicitly requested global visual update.
- For images managed in CRM and displayed by a source Website, use the existing `/api/storage` API. Bind the uploaded file to exactly one source Website business entity through the source registry and typed adapter. CRM migrations must not create or alter `storage_files`.

## Source Capabilities

- Use source-registry schema v2. Each entity declares its `relationships` and structured `operations`; an operation has an `id`, `kind`, and CRM typed-adapter `adapterMethod`, and may declare `requiredRelations`, lifecycle `transition`, or `preconditions`.
- Render an action only when the selected source registry exposes the corresponding operation and its typed adapter implements the declared `adapterMethod`. Runtime mutation flow is CRM route -> CRM service -> typed adapter -> shared Website database.
- A create operation with `requiredRelations` MUST use an explicit selection control for every required relationship. For an order create operation that requires `customers`, the CRM form must select one customer from the same source Website before submission.
- Product capabilities are source-specific. When the source exposes them, provide create, update, publish, unpublish, and archive actions. Publish and unpublish use the source lifecycle transition; unpublish is not archive.
- Customer capabilities are source-specific. When supported, provide create, update, and archive actions. Do not present hard deletion for customers that can be referenced by orders.
- Order capabilities are source-specific. When supported, provide create and lifecycle transition actions. Only expose deletion when the operation declares the source's draft-only precondition; all progressed orders use their declared lifecycle transitions.
- Inventory operations must use source-provided adjust, reserve, and release capabilities and preserve source availability constraints. Render SKU create, update, archive, and SKU-level inventory only when the source registry declares SKU support; do not invent SKU records for a product-only source.
- A transition action is valid only for the declared `from` states and target `to` state. Respect operation `preconditions` and surface source validation errors without guessing an alternative transition.

## Commerce Publish Contract

Apply the complete contract only when the source registry declares a products
publish transition and the bound entity exposes both slug and cover-image
publish surfaces. Never infer publishing from a field or invent a missing
operation, SKU, token, or lifecycle transition.

For each matching source, read the selected scenario's
`runtime-reference/publish-contract.md` before changing its Website schema,
adapter, service, UI, or tests, then use only the runtime assets that reference
calls for. Non-matching sources do not read or install the publish-chain package.
The source Website owns its business schema and consumer rendering; CRM
migrations never alter those tables. If the conditional reference is missing,
follow the current business generation workflow and report the template gap.

## CRM-Owned Data And Authentication

- CRM may own only authentication, authorization, audit, preferences, and saved-view support data. Every CRM-owned table and migration target starts with `crm_`.
- Use the materialized `local-admin-v1` Better Auth preset. Do not replace its auth endpoints, password handling, bearer-session plumbing, or database adapter.
- The first successful `/auth` bootstrap registration atomically becomes administrator through `crm_auth_bootstrap`. Never use `SELECT COUNT(user)` to determine the first administrator.
- Public Better Auth signup is closed outside bootstrap and after bootstrap completes.
- Only an active administrator may create later users. Protect the last active administrator and revoke sessions when a user is disabled.
- Register the local-admin preset's `/settings/users` page in the final CRM client router before the catch-all route. Render `UsersSettingsPage` behind `AdminGuard`.
- Provide a visible user/permission-management navigation entry for active administrators only. Non-admin users must not see the entry, and direct access must render 403.
- Reuse the preset `/api/crm-users` API and user-management page. Do not implement a second account store, password flow, or administration API.
- Protect every CRM business API with `protectedRoute` or `adminRoute` as appropriate.
- Never seed an administrator or create one through a deployed API, online database, migration, deploy hook, or post-publish verification.

## CRM Information Architecture

- The CRM MUST expose visible primary navigation for its business modules.
- The CRM MUST provide an `overview` module and at least one business-resource module.
- Every core resource with an independent list, detail, or mutation workflow MUST have its own primary navigation entry. Closely related entities may share one module, such as orders and order items in an Orders module.
- A source selector is a global data filter. It MUST NOT replace business-module navigation.
- Primary navigation may use tabs, sidebar items, or routes. A single React route is acceptable, but a single scrolling page that mixes all business resources without primary navigation is not.
- Match the selected scenario's visual language, layout density, navigation structure, component patterns, and interaction behavior as closely as practical.
- The selected scenario is not a pixel-perfect reproduction requirement. Adapt modules and content to current source capabilities, and do not generate empty modules for unsupported capabilities.
- When the user provides explicit visual, layout, or interaction requirements, those requirements take precedence over the selected scenario reference.
- User visual preferences and scenario references MUST NOT override authentication, authorization, data ownership, source capabilities, business invariants, or security requirements.
- Use the CRM reference's compact operator-console composition: sidebar or compact primary navigation, a dense list toolbar, source Website selector, search, Filter, Refresh, Create, and pagination when a list has more than one page.
- Refresh, Create, search, Filter, source selection, pagination, row actions, and status controls must all perform real, capability-backed work. Do not render Notifications, Help Centre, or decorative menu/sort/column controls without a supported behavior.
- Design responsive behavior for the available container width, including embedded views; do not assume a full browser viewport.
- When primary navigation no longer fits, provide an explicit alternative such as compact navigation, an overflow menu, or a drawer; never make it disappear without an access path.
- Keep primary content shrinkable and preserve page scrolling. Tables may scroll horizontally within their own container; do not use fixed viewport height or outer overflow rules that hide page content.
- At handoff, report the selected scenario and the reference patterns adopted for primary navigation, layout/density, component patterns, and operator interactions. Do not claim pixel-perfect reference parity without browser review.

## CRM Functional Requirements

- Overview MUST show useful metrics, operational exceptions, visible source identity, and persisted-data refresh.
- Each business-resource module MUST provide a real record list and, where meaningful, record details, filtering, and empty states.
- Implement the create, edit, archive, cancel, delete, and status-transition operations allowed by the source registry.
- State-changing actions MUST preserve source authorization, valid transitions, inventory or capacity constraints, money and time rules, and archive behavior.
- Mutations MUST use real forms and confirmation UI where appropriate, with pending, error, success, and post-mutation refresh behavior.
- CRM pages and business APIs MUST follow the configured authentication and role requirements.
- Runtime data MUST come from the shared database through the generated source registry and typed adapters. Fixtures and hard-coded results are forbidden.
- Do not expose actions that current source applications cannot actually perform. Concrete API paths, payloads, component boundaries, and normalized CRM view models remain generated-project decisions.

## Change Impact And Local Validation

Review impact on every ordinary Website whenever CRM is generated or updated, or whenever a Website schema, migration, service, route, test, or business invariant used by CRM changes. Scope the re-read to the change surface: re-read the schema, migrations, and the entity services or routes the change touches; a Website whose tables and adapter surface are untouched gets an evidence-backed impact decision from the change surface, not a full re-read. The change surface includes auth gates, session or tenant filters, and operation preconditions on entities CRM binds; a change there always counts as affected, even when tables and adapter method signatures are untouched. Do not use schema fingerprints or stale hashes. When an adapter, Website contract, or Website behavior is affected, update that project and validate it locally before deployment.

CRM inspector `ready` means the generated project has the required structural contract: one Workspace CRM entry, complete source registry coverage, typed adapters for supported sources, CRM migration ownership, and valid local-admin mode. It does not certify CRM workflows, RBAC behavior, mutations, source invariants, or browser interactions. Treat those as separate local behavior checks.

Required local coverage includes Workspace migration replay, repository persistence, aggregate and single-source reads, unsupported-source behavior, source isolation, single-source mutations, Website invariants, `/auth` bootstrap/sign-in, `/settings/users` routing and admin-only navigation, user-management mutations, auth/RBAC, first-admin concurrency, closed signup, last-admin protection, session revocation, build/lint, and deterministic operation checks. Run these checks against an isolated local database.

## Release Safety

1. Fix local failures and rerun the affected checks until `skywork-cli website validate --path . --gate local` and `skywork-cli business web-app db validate-workspace --changed-website-id <uuid7>` pass.
2. Deploy affected ordinary Websites in dependency order, then deploy the CRM Website.
3. Use deployment control-plane status only to confirm delivery. Never call deployed Website or CRM business APIs, including `/api/crm-auth/bootstrap`, `/api/auth/*`, or `/api/crm-users`, and never query or mutate the production database for verification.
4. Do not make affected Websites public automatically. Report which Apps changed so the user can decide whether to publish them publicly.
5. After CRM deployment, tell the user to visit `/auth`; the first successfully registered account becomes the administrator. That administrator manages later users at `/settings/users`.
