# Upload these files to GitHub root

Delete the broken files currently in EHLUK/planningappv6, then upload the CONTENTS of this folder to the repository root.

The GitHub root must show:

- Dockerfile
- package.json
- src
- prisma
- public
- database
- docs
- README.md

Important checks:

- Dockerfile must start with: FROM node:20-alpine AS deps
- package.json must start with: { and contain "scripts"
- README.md must start with: # Contract Control Hub
- Do not upload this folder as one folder. Upload its contents.
- Do not upload individual route.ts files as Dockerfile or package.json.

Render settings:

- Environment: Docker
- Root Directory: blank
- Dockerfile Path: ./Dockerfile
