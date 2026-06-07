# Render Deployment

The Render error `failed to read dockerfile: open Dockerfile: no such file or directory` means the service is set to build with Docker but Render cannot find a `Dockerfile` in the configured root directory.

## If the GitHub repo root contains `ContractControlHub`

Use:

- Environment: `Docker`
- Root Directory: leave blank
- Dockerfile Path: `./Dockerfile`

The root `Dockerfile` copies and builds the `ContractControlHub` app folder.

## If Render root directory is set to `ContractControlHub`

Use:

- Environment: `Docker`
- Root Directory: `ContractControlHub`
- Dockerfile Path: `./Dockerfile`

The app-folder `Dockerfile` builds from inside the Next app directly.

## Required Environment Variables

For the current local-storage prototype layer, the app can start without a database.

When database-backed API routes are used, set:

```text
DATABASE_URL=postgresql://...
```

## Expected Runtime

The container runs:

```text
npm run start
```

and exposes:

```text
PORT=3000
```
