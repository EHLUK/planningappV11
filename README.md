# Contract Control Hub

A multi-contract programme, planning, commercial, and NEC controls platform.

This is the proper application scaffold that will replace the single-file HTML prototype over time. The prototype remains in the parent folder as `Dashboard.html` and should be treated as the reference for existing behaviours while this app is built out.

## Product Shape

The app is contract-first. Users create or select a contract, then all programme uploads, baselines, planning updates, blockers, reports, early warnings, compensation events, and AI outputs are stored against that contract.

Core areas:

- Contract Setup
- Programme Management
- Planning Workspace
- My Work
- People and Resources
- Delivery Control
- Commercial / NEC Controls
- Reports
- Admin

## Current Build State

The first interactive product layer is in place:

- Contract selector
- Contract setup wizard
- Local contract saving in browser storage
- Programme upload centre state with current XER parsing into planning activities
- Baseline XER finish-date mapping against matching activity IDs
- Setup readiness checks
- Command priorities panel with control score and meeting challenge list
- Planning workspace preview
- Search, owner, status, and area filters across planning views
- Planning window date navigation
- Drag/drop activity scheduling with capacity override warnings
- Bulk owner, status, and start-date updates
- Schedule adherence metrics for the selected window
- Owner assignment directly on planning activities
- Additional look-ahead activity creation
- People and resources register for named allocation
- Personal "My Work" console for owner-specific activity updates
- Constraints register linked to activities
- Daily meeting actions and mobile-style activity updates
- Commitments log for promises made in planning meetings
- Handoff tracker for interface control between teams
- Commercial control register for EWN, CE, PMI, and Clause 32 records
- Local audit trail for key planning changes
- NEC control register placeholders
- Report pack builder
- Database schema and API route foundations

The next engineering step is connecting the UI save actions to PostgreSQL through the API routes in `src/app/api`.

The product thinking behind the next functional releases is captured in:

```text
docs/functionality-deep-dive.md
```

## Recommended Stack

- Next.js / React frontend
- PostgreSQL database
- Prisma ORM
- Azure App Service or Azure Static Web Apps for hosting
- Microsoft Entra ID for login when ready
- Azure Blob Storage or SharePoint Graph integration for XER/report file storage

## Getting Started

This environment does not currently expose `npm`, so dependencies have not been installed here. On a development machine with Node and npm:

```powershell
cd ContractControlHub
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Database

The intended database model is in:

```text
prisma/schema.prisma
database/schema.sql
```

Use PostgreSQL for the central production database.

## Next Build Steps

1. Wire Prisma to a real PostgreSQL database.
2. Connect Contract Setup save/load to the `/api/contracts` routes.
3. Harden the new `src/lib/xer` parser against the full production XER sample set.
4. Add authenticated file upload for current, previous, and baseline programmes.
5. Store parsed activities, relationships, WBS, calendars, and key dates.
6. Rebuild the planning board using saved planning assignments and activity updates.
7. Connect My Work, commitments, handoffs, constraints, commercial records, and actions to the database API routes.
8. Rebuild the reports and AI narrative features using central data.
