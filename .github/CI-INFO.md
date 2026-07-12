# CI — Continuous Integration

Explicación del flujo de integración continua del proyecto.

## Qué es CI

La integración continua (CI) es un proceso automatizado que verifica que el código nuevo funciona correctamente cada vez que se sube al repositorio. En este proyecto, se ejecuta automáticamente en cada `push` a `main` y en cada `pull request`.

## Workflow: `.github/workflows/ci.yml`

El workflow de CI está definido en `.github/workflows/ci.yml` y hace lo siguiente:

### 1. Trigger (Cuándo se ejecuta)

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

**Qué hace:** El workflow se ejecuta automáticamente cuando:

- Haces un `push` a la rama `main`
- Creas o actualizas un `pull request` hacia `main`

**Objetivo:** Asegurar que todo nuevo código está validado antes de mergearse.

### 2. Matriz de servicios (Strategy matrix)

```yaml
strategy:
  matrix:
    service: [backend, frontend]
```

**Qué hace:** El workflow se ejecuta dos veces en paralelo, una para cada servicio (`backend` y `frontend`).

**Objetivo:** Validar independientemente cada parte del proyecto.

### 3. Pasos del build

#### a) Checkout (Descargar el código)

```yaml
- uses: actions/checkout@v4
```

**Qué hace:** Descarga el código del repositorio a la máquina de CI.

**Objetivo:** Tener el código disponible para compilar y verificar.

#### b) Setup Node.js

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "20"
```

**Qué hace:** Instala Node.js 20 en el entorno de CI.

**Objetivo:** Preparar el entorno para ejecutar comandos `npm`.

#### c) Instalar dependencias

```yaml
- name: Install dependencies
  working-directory: ${{ matrix.service }}
  run: npm ci
```

**Qué hace:** Ejecuta `npm ci` en el directorio del servicio (backend o frontend).

**Objetivo:**

- `npm ci` = **clean install**, es más seguro y rápido que `npm install` para CI.
- Asegura que las dependencias exactas declaradas en `package-lock.json` se instalan.

#### d) Generar cliente Prisma (solo backend)

```yaml
- name: Generate Prisma client (backend)
  if: matrix.service == 'backend'
  working-directory: backend
  run: npm run prisma:generate
```

**Qué hace:** Ejecuta `npm run prisma:generate` solo para el backend.

**Objetivo:**

- Genera el cliente de Prisma a partir del esquema.
- Si hay errores en el esquema, fallarán el build aquí.

#### e) Build (Compilar)

```yaml
- name: Build
  working-directory: ${{ matrix.service }}
  run: npm run build
```

**Qué hace:** Compila el TypeScript a JavaScript.

**Objetivo:**

- **Backend:** Verifica que el código TypeScript es válido y se puede compilar a JavaScript.
- **Frontend:** Verifica que el build de Next.js funciona (incluye la generación de rutas estáticas y dinámicas).

#### f) Run tests (Ejecutar pruebas)

```yaml
- name: Run tests
  working-directory: ${{ matrix.service }}
  run: npm run test
```

**Qué hace:** Ejecuta `npm run test` para correr los tests unitarios con Jest.

**Objetivo:**

- Verifica que toda la lógica de negocio funciona correctamente.
- Si algún test falla, el workflow falla y no permite hacer merge al PR.

#### g) Lint (Verificar estilo de código)

```yaml
- name: Lint (optional)
  working-directory: ${{ matrix.service }}
  run: |
    npm run lint || true
```

**Qué hace:** Ejecuta `npm run lint` para verificar el estilo del código.

**Objetivo:**

- Detecta código con formato inconsistente o patrones problemáticos.
- El `|| true` al final hace que el paso **no falle** aunque el lint encuentre errores (es opcional).

## Ejemplo: Qué pasa cuando haces un pull request

1. Haces `git push` a tu rama feature.
2. Creas un PR hacia `main`.
3. GitHub detecta el evento y ejecuta el workflow.
4. Se ejecutan 2 trabajos en paralelo: uno para `backend` y otro para `frontend`.
5. Cada uno:
   - Descarga el código
   - Configura Node.js 20
   - Instala dependencias
   - Genera cliente Prisma (si es backend)
   - Compila el código
   - Ejecuta los tests unitarios
   - Verifica el formato (opcional)
6. Si todo es exitoso, ✅ aparece en el PR.
7. Si algo falla, ❌ aparece y puedes ver los logs para corregir.

## Cómo ver los logs

1. Ve al PR en GitHub.
2. Scroll a "Checks" (debajo del título).
3. Haz clic en "Details" del workflow.
4. Expande cada paso para ver los logs.

## Cómo agregar más pasos

Si necesitas agregar más validaciones (análisis de seguridad, etc.), edita `.github/workflows/ci.yml`:

```yaml
- name: Run security audit
  working-directory: ${{ matrix.service }}
  run: npm audit --audit-level=moderate
```

Los tests ya están incluidos en el workflow y se ejecutan automáticamente.

## Notas

- El workflow usa **acciones reutilizables** de GitHub (como `actions/checkout` y `actions/setup-node`) que ya están optimizadas.
- Puede tardar **3-7 minutos** dependiendo de las dependencias e tests.
- Los dos servicios se ejecutan **en paralelo**, así que no se duplica el tiempo.
- Los **tests deben pasar** para que el PR pueda ser mergeado.
