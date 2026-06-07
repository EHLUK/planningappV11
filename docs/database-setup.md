# Database Setup

Use PostgreSQL as the central database.

## Local Development

Create a database:

```sql
CREATE DATABASE contract_control_hub;
```

Set `.env`:

```text
DATABASE_URL="postgresql://user:password@localhost:5432/contract_control_hub?schema=public"
```

Run Prisma once dependencies are installed:

```powershell
npm run prisma:generate
npm run prisma:migrate
```

## Production Direction

Recommended production path:

- Azure Database for PostgreSQL
- Azure App Service for the Next.js app
- Azure Blob Storage for uploaded XER/PDF files
- Microsoft Entra ID for login and role control

## Contract Isolation

Every business table has a `contractId` / `contract_id`. That keeps each contract separate while still allowing portfolio reporting across all contracts later.
