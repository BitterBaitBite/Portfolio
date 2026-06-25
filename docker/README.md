# Docker — personal-web

Instrucciones para ejecutar el proyecto con Docker Compose.

## Requisitos

- Docker
- Docker Compose

## Levantar los servicios

Desde la raíz del repositorio:

```bash
docker compose up --build
```

O usar el Makefile:

```bash
make docker-up
```

Esto levanta:

- Postgres en el servicio `db`
- Backend en el servicio `backend`
- Frontend en el servicio `frontend`

## URLs de los servicios

- Frontend: http://localhost:3000
- Backend (API): http://localhost:4000
- Postgres: localhost:5432

## Configuración interna

- El `docker-compose.yml` usa `backend/Dockerfile` y `frontend/Dockerfile`.
- El contenedor frontend está configurado con `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000`.
- El backend lee `DATABASE_URL` directamente del archivo de entorno o de la variable de entorno definida en el contenedor.

## Migraciones y seed

Después de que la base de datos esté disponible, ejecuta las migraciones y el seed desde el host o dentro del contenedor del backend.

Ejemplo desde el host:

```bash
cd backend
npm run prisma:migrate
npm run seed
```

## Apagar contenedores

```bash
docker compose down --volumes
```

O con el Makefile:

```bash
make docker-down
```

## Notas

- Si necesitas cambiar la URL del API en el frontend, actualiza `NEXT_PUBLIC_API_BASE_URL` en el `docker-compose.yml`.
- Para producción, considera reemplazar la cookie `portfolio_token` con un flujo de autenticación basado en cookies HttpOnly y HTTPS.
