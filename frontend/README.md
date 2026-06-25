# Frontend — personal-portfolio-frontend

Instrucciones específicas para el cliente Next.js.

## Requisitos previos

- Node.js 20+
- npm

## Instalar dependencias

```bash
cd frontend
npm install
```

## Ejecutar en local

```bash
npm run dev
```

Luego abre:

- http://localhost:3000

## Build de producción

```bash
npm run build
npm run start
```

## Usar Makefile desde la raíz

```bash
make frontend-install
make frontend-dev
make frontend-build
```

## Testing

Unit tests are located in `src/**/*.spec.ts` and `src/**/*.spec.tsx`. Run tests with:

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
make frontend-test
make frontend-test-watch
make frontend-test-cov
```

## Notes de autenticación

- La página de login almacena el JWT en `localStorage`.
- También escribe una cookie no HttpOnly llamada `portfolio_token` para que `frontend/middleware.ts` pueda leerla y proteger `/dashboard`.
- En producción, lo ideal es usar cookies HttpOnly y un flujo de refresco más seguro.

## Problemas comunes

- Si la página de login no redirige correctamente a `/dashboard`, revisa que `portfolio_token` exista en el navegador.
- Si `npm run build` falla, revisa que `frontend/tsconfig.json` y `tailwind.config.js` estén configurados correctamente.
