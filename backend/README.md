# Backend — personal-portfolio-backend

Focused instructions for local development and common tasks for the NestJS + Prisma backend.

Prerequisites

- Node.js 20+
- npm
- PostgreSQL (local or container)

Environment

Create `backend/.env` and set `DATABASE_URL` to your PostgreSQL connection string.
Optional seed overrides:

- `ADMIN_USERNAME` (default: admin)
- `ADMIN_EMAIL` (default: admin@admin.local)
- `ADMIN_PASSWORD` (default: ChangeMe123!)

Install & setup

```bash
cd backend
npm install
npm run prisma:generate
```

Or from the root:

```bash
make backend-install
```

Migrate and seed

```bash
# Run the interactive migration flow (creates the DB tables)
npm run prisma:migrate

# Seed admin user
npm run seed
```

Or from the root:

```bash
make backend-migrate
make backend-seed
```

Run locally

```bash
npm run start:dev
```

Or from the root:

```bash
make backend-dev
```

Docker

The repository includes a `Dockerfile` and `docker-compose.yml` at the repository root. To run Postgres + backend + frontend together:

```bash
docker compose up --build
```

Then run migrations & seed from the host or inside the backend container.

Useful npm scripts (in `package.json`)

- `start` — run production build
- `start:dev` — run NestJS in watch mode
- `build` — compile TypeScript
- `prisma:generate` — generate Prisma client
- `prisma:migrate` — run migrations
- `seed` — run the TypeScript seed script
- `test` — run unit tests with Jest
- `test:watch` — run tests in watch mode
- `test:cov` — run tests with coverage report

Testing

Unit tests are located in `src/**/*.spec.ts`. Run tests with:

```bash
npm run test
```

For development with watch mode:

```bash
npm run test:watch
```

For coverage report:

```bash
npm run test:cov
```

Or from the root:

```bash
make backend-test
make backend-test-watch
make backend-test-cov
```

Troubleshooting

- If `prisma:migrate` fails with a connection error, ensure Postgres is reachable and `DATABASE_URL` is correct.
- To inspect the DB: use `psql` or a GUI tool (pgAdmin, TablePlus) against the configured `DATABASE_URL`.
