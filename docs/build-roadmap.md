# Build Roadmap

## Phase 1 - Contract Setup

Goal: make the app work for any contract.

Deliverables:

- Contract creation/editing
- Contract selector
- NEC option and contract metadata
- Project team/owner setup
- WBS, area, and discipline mappings
- Key Dates and Completion Date setup

## Phase 2 - Programme Uploads

Goal: centralise XER programme records.

Deliverables:

- Current programme upload
- Previous submission upload
- Baseline programme upload
- XER parser moved from the HTML prototype into a shared library
- Activities, relationships, WBS, calendars, milestones, and float stored in the database

## Phase 3 - Planning Workspace

Goal: rebuild the weekly board from central saved data.

Deliverables:

- Weekly planning board
- Owner assignment
- Auto scheduler
- Capacity view
- Activity update log
- Blocker register
- Schedule adherence dashboard

## Phase 4 - Reports

Goal: produce branded reports from stored contract data.

Deliverables:

- Planning workspace report
- Clause 32 programme narrative
- Schedule integrity report
- Baseline comparison report
- Weekly look-ahead report
- Blocker and ownership reports

## Phase 5 - AI Layer

Goal: make AI outputs smarter and auditable.

Deliverables:

- AI prompt templates per contract
- Stored AI output history
- Clause 32 narrative generation
- Meeting pack
- Blocker root cause analysis
- Ownership gap analysis
- Draft update notes

## Phase 6 - Hosting and Security

Goal: central shared use.

Deliverables:

- Azure deployment
- PostgreSQL production database
- Microsoft Entra ID login
- Role-based access
- File storage using Azure Blob Storage or SharePoint Graph
