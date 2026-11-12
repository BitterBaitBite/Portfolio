# Portfolio

This repository contains a simple portfolio full-stack scaffold:

- Backend: NestJS + Prisma + PostgreSQL
- Frontend: Next.js (App Router) + TypeScript + TailwindCSS

Quick start (backend)

1. Create the backend environment file
   - Create `backend/.env` and set `DATABASE_URL` to point to your PostgreSQL instance.
   - Optional environment variables for the seed user:
     - `ADMIN_USERNAME` (default: `admin`)
     - `ADMIN_EMAIL` (default: `admin@admin.local`)
     - `ADMIN_PASSWORD` (default: `ChangeMe123!`)

2. Install dependencies and generate Prisma client

```bash
cd backend
npm install
npm run prisma:generate
```

Or use the root Makefile:

```bash
make backend-install
```

3. Run migrations and seed

```bash
cd backend
npm run prisma:migrate
npm run seed
```

Or from the root:

```bash
make backend-migrate
make backend-seed
```

4. Run backend in development

```bash
cd backend
npm run start:dev
```

Or from the root:

```bash
make backend-dev
```

Notes about the seed script

- The seed script is at `backend/prisma/seed.ts`. It upserts an admin `User` with the values above when executed. Change the env vars before running if you want different credentials.
- Passwords are hashed with `bcrypt`.

Quick start (frontend)

1. Install and run

```bash
cd frontend
npm install
npm run dev    # for local development
npm run build  # to build production assets
npm run start  # to serve the built app
```

Or use the root Makefile:

```bash
make frontend-install
make frontend-dev
make frontend-build
```

2. Auth / middleware notes

- The login page stores the JWT in `localStorage` and also sets a non-HttpOnly cookie named `portfolio_token` so the Next.js `middleware.ts` can read it for server-side redirects to `/login` when accessing `/dashboard`.
- For production, consider changing to server-set HttpOnly cookies and a proper refresh token flow.

Troubleshooting

- If `prisma generate` fails, ensure your `DATABASE_URL` is valid and Postgres is reachable.
- If the frontend middleware redirects unexpectedly, check the cookie in the browser devtools under the `Application` tab.

Detailed service documentation is available in:

- `backend/README.md`
- `frontend/README.md`
- `docker/README.md`
- `.github/README.md` (CI/CD pipeline explanation)

Docker (local)

1. Build and start all services (Postgres, backend, frontend):

```bash
docker compose up --build
```

Or use the Makefile from the root:

```bash
make docker-up
```

2. Services:

- Frontend: http://localhost:3000
- Backend (API): http://localhost:4000
- Postgres: localhost:5432

Notes:

- The compose file uses `backend/Dockerfile` and `frontend/Dockerfile`.
- The backend service exposes port `4000` and the frontend service exposes port `3000`.
- The frontend service is configured to use `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000`.
- After the DB is up, run migrations and the seed script locally or inside the backend container:

```bash
cd backend
npm run prisma:migrate
npm run seed
```

Continuous Integration (GitHub Actions)

- A basic CI workflow is included at `.github/workflows/ci.yml` that installs dependencies and builds both `backend` and `frontend` on push and pull requests to `main`.
- The workflow also runs unit tests with Jest for both services.
- See `.github/README.md` for a detailed explanation of what each step does and how to extend the workflow.

Testing

Unit tests are included for both backend and frontend:

- Backend: `backend/src/**/*.spec.ts` (using Jest + NestJS testing utilities)
- Frontend: `frontend/src/**/*.spec.ts(x)` (using Jest + React Testing Library)

Run tests locally:

```bash
# Backend tests
make backend-test
make backend-test-watch
make backend-test-cov

# Frontend tests
make frontend-test
make frontend-test-watch
make frontend-test-cov
```

Or from within each service directory:

```bash
cd backend
npm run test:watch

cd frontend
npm run test:watch
```
