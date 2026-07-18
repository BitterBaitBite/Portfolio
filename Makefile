.PHONY: all backend-install backend-migrate backend-seed backend-dev backend-build backend-test frontend-install frontend-dev frontend-build frontend-test docker-up docker-down

all: backend-build frontend-build

dev: backend-dev frontend-dev

# Backend targets
backend-install:
	cd backend && npm install

backend-migrate:
	cd backend && npm run prisma:migrate

backend-seed:
	cd backend && npm run seed

backend-dev:
	cd backend && npm run start:dev

backend-build:
	cd backend && npm run build

backend-test:
	cd backend && npm run test

backend-test-watch:
	cd backend && npm run test:watch

backend-test-cov:
	cd backend && npm run test:cov

# Frontend targets
frontend-install:
	cd frontend && npm install

frontend-dev:
	cd frontend && npm run dev

frontend-build:
	cd frontend && npm run build

frontend-test:
	cd frontend && npm run test

frontend-test-watch:
	cd frontend && npm run test:watch

frontend-test-cov:
	cd frontend && npm run test:cov

# Docker compose controls
docker-up:
	docker compose up --build

docker-down:
	docker compose down --volumes
