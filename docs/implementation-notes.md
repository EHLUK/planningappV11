# Implementation Notes

## Prototype Relationship

The existing `Dashboard.html` is the working prototype. Do not delete it. The rebuild should migrate functionality module by module.

Recommended migration order:

1. Contract setup and contract selector
2. XER parser and programme upload
3. Programme viewer and baseline comparison
4. Planning workspace and activity update log
5. My Work, commitments, handoffs, constraints, and daily meeting actions
6. Reports and AI outputs

## Data Rule

Every saved record must belong to a contract. This prevents the new app from becoming tied to a single project number and allows the same platform to support any contract.

## Delivery Control Rule

The planning board should not be the only source of truth. Owner actions, commitments, handoffs, blockers, and field updates need to be stored as separate contract records so a Project Manager can review what was promised, what moved, what slipped, and who needs support.

## Upload Types

Each contract supports three programme file roles:

- `CURRENT`: the live/current programme submission
- `PREVIOUS`: the last submitted or accepted programme for movement analysis
- `BASELINE`: the contractual or rebaseline programme used for baseline comparison

## AI Rule

AI should not invent contract facts. Prompts should be built from stored contract setup data, programme data, planning updates, blockers, CEs, EWNs, and report settings. Missing facts should be called out as missing information for the user to complete.

## Database Rule

PostgreSQL is the target database. Browser local storage should only be used for temporary UI state, never for contract records, programme uploads, or planning updates in the finished app.

## Current UI Rule

The current app shell saves contract setup data to browser storage so the product flow can be tested before PostgreSQL is running. This is temporary. The API routes under `src/app/api` are the intended database boundary for the proper hosted version.
