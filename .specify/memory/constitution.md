<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0
- Ratification: unchanged (2026-07-10)
- Modified principles:
    II. Single-Source Dependency Versioning — added exact/pinned-version rule
      (no caret `^` or tilde `~` ranges)
- Added principles: none
- Added sections: none
- Removed sections: none
- Templates requiring updates:
    ✅ .specify/templates/plan-template.md (generic Constitution Check gate — aligns, no edit needed)
    ✅ .specify/templates/spec-template.md (no principle-specific references — aligns)
    ✅ .specify/templates/tasks-template.md (no principle-specific references — aligns)
    ✅ .specify/templates/checklist-template.md (no principle-specific references — aligns)
- Follow-up TODOs: none
-->

# param-nx-platform Constitution

## Core Principles

### I. Nx-First Workflow
All repository tasks — build, test, lint, typecheck, e2e, serve, and release — MUST be run
through Nx (`nx run`, `nx run-many`, `nx affected`) rather than invoking the underlying
tooling directly. Commands MUST be prefixed with the workspace package manager (`pnpm nx …`)
so no globally installed CLI is used. New projects MUST participate in the Nx project graph
(discoverable via `nx graph`) and expose their work as Nx targets.

Rationale: Running through Nx preserves remote caching, correct task-graph ordering, and
`affected` detection. Bypassing it silently breaks caching and CI correctness.

### II. Single-Source Dependency Versioning
Every third-party dependency version MUST be declared exactly once in the pnpm `catalog:`
in `pnpm-workspace.yaml`; project manifests MUST reference it via the `catalog:` protocol
and MUST NOT pin their own version. Internal packages MUST be consumed via the
`workspace:*` protocol. Catalog entries MUST be exact, pinned versions (e.g. `19.2.3`) —
range specifiers such as caret (`^`) or tilde (`~`) are PROHIBITED, so a resolve can never
silently drift to a newer version. When a new library is added, it MUST enter the catalog
at an exact version. pnpm is the ONLY supported package manager — use `pnpm install`
and `pnpm dlx`, never `npm`/`npx`/`yarn`. Transitive forks MUST be pinned back to the
catalog via `overrides`.

Rationale: A single React Native / Expo native surface cannot tolerate version drift.
One source of truth per dependency prevents duplicate/incompatible native modules.

### III. Library-First, Thin-App Architecture
Shared logic, UI, and configuration MUST live in independently consumable packages under
`packages/*` (e.g. `@param-nx-platform/core-ui`, `@param-nx-platform/core-config`). Apps
under `apps/*` MUST compose these packages and contain only app-specific wiring, routing,
and configuration. A new package MUST be self-contained and independently buildable; an
app MUST NOT hold reusable logic that belongs in a package.

Rationale: Keeping apps thin and logic in libraries maximizes reuse across future apps,
keeps the dependency graph legible, and makes `affected` builds precise.

### IV. Explicit Module Boundaries & Public Contracts
Each package MUST expose its public API through a single entry point (`src/index.ts` and
the `exports` map); consumers MUST import via the package name, never deep relative or
internal paths. Host-provided dependencies (React, React Native, Expo) MUST be declared as
`peerDependencies`, not bundled as hard dependencies. Cross-package imports MUST respect
the declared dependency direction — apps depend on packages, never the reverse.

Rationale: Explicit barrels and peer dependencies keep coupling intentional, prevent
duplicate React/RN instances, and let the module graph stay acyclic and enforceable.

### V. Type-Safe, Verified Changes
TypeScript is the source language and the `typecheck` target MUST pass for every changed
project before a change is considered complete. Lint MUST pass. TypeScript project
references MUST be kept in sync (`pnpm nx sync`). Type-safety escape hatches (`any`,
`@ts-ignore`, non-null `!` on unchecked values) MUST be justified in review or removed.
When automated tests exist for a touched project they MUST pass; new behavior SHOULD be
accompanied by tests where a test harness is present.

Rationale: Static verification is the cheapest defect gate in a strongly typed monorepo;
letting typecheck or lint regress erodes the guarantees every other project relies on.

## Technology & Platform Constraints

- Runtime stack: Expo + React Native (New Architecture) with `expo-router`; web via
  `react-native-web`. Authentication via `@clerk/expo`.
- Monorepo tooling: Nx with the `@nx/js/typescript` plugin (inferred `build`/`typecheck`
  targets); pnpm workspaces with `nodeLinker: hoisted`.
- Package manager: pnpm (version pinned in root `packageManager`). All contributor and CI
  commands MUST use pnpm.
- Dependency versions are governed exclusively by the pnpm catalog (see Principle II).
  Upgrades happen by editing the catalog, not individual manifests.
- Package identity: internal packages use the `@param-nx-platform/*` scope and set a stable
  Nx project `name`.

## Development Workflow & Quality Gates

- Scaffolding: new apps, libraries, and project structure MUST be created with Nx
  generators (via the `nx-generate` workflow), not hand-rolled directories.
- Before a change is complete: `pnpm nx affected -t typecheck lint` (plus `test`/`build`
  where defined) MUST pass, and `pnpm nx sync` MUST leave project references clean.
- Adding a dependency: add the version to the catalog first, then reference it as
  `catalog:` in the consuming manifest; link workspace packages via `workspace:*`.
- Code review MUST verify compliance with the Core Principles; any deviation MUST be
  called out and justified, or the change revised.

## Governance

This constitution supersedes ad-hoc practices and conventions for the workspace. Amendments
MUST be made by editing this document via the `/speckit-constitution` workflow, which keeps
the dependent SpecKit templates in sync and records a Sync Impact Report.

Versioning of this constitution follows semantic versioning:
- MAJOR: backward-incompatible governance changes or removal/redefinition of a principle.
- MINOR: a new principle or section, or materially expanded guidance.
- PATCH: clarifications, wording, and non-semantic refinements.

All pull requests and reviews MUST verify compliance with the principles above. Added
complexity that violates a principle MUST be justified in the plan's Complexity Tracking
section or removed. Runtime and contributor guidance in `CLAUDE.md` is authoritative for
day-to-day agent behavior and MUST remain consistent with this constitution.

**Version**: 1.1.0 | **Ratified**: 2026-07-10 | **Last Amended**: 2026-07-10
