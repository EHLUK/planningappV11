# Functionality Deep Dive

## Product Aim

The app should help a Project Manager, planner, supervisor, and commercial lead run the work, not just report on it. The useful centre of gravity is: what is planned, who owns it, what is blocking it, what was promised, what changed, and what needs escalation.

## Strong Functions Now In Place

- Contract-first setup so the platform is not tied to one project number.
- Current, previous, and baseline programme source slots.
- Planning board, Gantt, area, and list views.
- Activity owner assignment and additional look-ahead activity creation.
- Personal My Work console for owner-specific updates.
- Constraints, daily actions, commitments, handoffs, and audit trail.
- Command priorities panel that turns the records into meeting challenge points.
- Planning filters for search, owner, status, and area.
- Current XER parsing into planning activities.
- Baseline XER finish-date mapping by matching activity ID.
- Drag/drop planning onto date columns with capacity override warning.
- Bulk planning actions for owner, status, and date.
- Schedule adherence metrics for the current planning window.
- Commercial control register for EWN, CE, PMI, and Clause 32 records.
- Database/API foundations for the main delivery records.

## Highest-Value Next Functions

- Hardening the `src/lib/xer` parser against all live XER variants and calendars.
- Database-backed save/load for every contract record.
- Calendar-aware planning dates instead of text labels.
- Capacity override reason capture and audit approval.
- Schedule adherence dashboard comparing planned date, forecast date, and actual update.
- Baseline comparison dashboard showing key date movement and slippage by activity.
- Full commercial workflows for EWNs, CEs, PMIs, and Clause 32 submissions.
- AI meeting pack, blocker root-cause analysis, ownership gap analysis, and Clause 32 narrative generated only from stored data.
- User login and role-based views for PM, planner, supervisor, commercial, and viewer.

## Things To Avoid

- Do not make the planning board carry every workflow by itself.
- Do not hide owner actions and commitments inside notes.
- Do not let AI invent missing contract information.
- Do not make upload tiles say loaded unless parsed data exists.
- Do not build reports that look good but cannot be traced back to source records.
- Do not over-colour the interface; use colour for status and risk only.

## Useful Meeting Workflow

1. PM opens Command Priorities.
2. Planner filters the Planning Workspace by area, owner, or status.
3. Team reviews My Work by owner.
4. Constraints and blockers are added or closed.
5. Commitments and handoffs are recorded during the meeting.
6. Meeting pack is copied/exported for minutes.
7. Reports and Clause 32 narrative are generated from the same records.

## Definition Of A Proper Product

The app becomes genuinely useful when it can answer these questions quickly:

- What must happen next?
- Who owns it?
- What is stopping it?
- What was promised last time?
- What has moved since the previous or baseline programme?
- What needs a contractual action?
- What can be reported with confidence?
