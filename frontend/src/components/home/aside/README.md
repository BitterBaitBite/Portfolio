# Componente Aside con Pestañas

Componente reutilizable que proporciona una barra lateral (aside) con tres pestañas: Dev, Cyber y GameDev. Incluye animaciones suaves y estilos inspirados en `SectionCard`.

## Características

✅ **Tres pestañas:** Dev, Cyber, GameDev
✅ **Estado reactivo:** Cambia de pestaña de forma fluida
✅ **Contenido agnóstico:** Pasa datos genéricos por props
✅ **Componentes reutilizables:** Estructura modular
✅ **Animaciones suaves:** Transiciones elegantes entre pestañas
✅ **Estilos consistentes:** Basados en `SectionCard`

## Estructura de Componentes

```
aside/
├── Aside.tsx           # Componente principal (state + layout)
├── TabButton.tsx       # Botón individual de pestaña
├── TabContent.tsx      # Contenedor de contenido de la pestaña
├── AsideExample.tsx    # Ejemplo de uso
└── index.ts           # Exportaciones
```

## Uso

### Importar

```typescript
import { Aside, type AsideProps, type TabItem } from "@/components/home/aside";
```

### Definir interfaz de datos

```typescript
interface MyItem extends TabItem {
  title: string;
  description: string;
  // ... más propiedades según necesites
}
```

### Preparar datos

```typescript
const devItems: MyItem[] = [
  {
    id: "dev-1",
    title: "React",
    description: "JavaScript library",
  },
  // ... más items
];

const cyberItems: MyItem[] = [
  // ...
];

const gameDevItems: MyItem[] = [
  // ...
];
```

### Crear función de renderizado

```typescript
const renderItem = (item: TabItem) => {
  const myItem = item as MyItem;
  return (
    <div>
      <h4>{myItem.title}</h4>
      <p>{myItem.description}</p>
    </div>
  );
};
```

### Usar el componente

```typescript
<Aside
  devItems={devItems}
  cyberItems={cyberItems}
  gameDevItems={gameDevItems}
  renderItem={renderItem}
/>
```

## Props

### `AsideProps`

| Prop           | Tipo                                 | Descripción                            |
| -------------- | ------------------------------------ | -------------------------------------- |
| `devItems`     | `TabItem[]`                          | Array de items para la pestaña Dev     |
| `cyberItems`   | `TabItem[]`                          | Array de items para la pestaña Cyber   |
| `gameDevItems` | `TabItem[]`                          | Array de items para la pestaña GameDev |
| `renderItem`   | `(item: TabItem) => React.ReactNode` | Función que renderiza cada item        |

### `TabItem`

Interfaz base para los items. Debe extenderse con tus propias propiedades:

```typescript
interface TabItem {
  id: string;
  [key: string]: any;
}
```

## Estilos

El componente utiliza:

- **Sombras:** `shadow-[3px_3px_0px_0px] shadow-zinc-400/15` (inspirada en SectionCard)
- **Hover:** Gradiente con efecto hover
- **Transiciones:** 700ms ease-out
- **Indicador de pestaña activa:** Línea gradiente cyan-blue
- **Animación de contenido:** Fade-in de 300ms

## Componentes

### `Aside` (Principal)

- Gestiona el estado de la pestaña activa
- Renderiza los botones de las pestañas
- Pasa el contenido correspondiente a `TabContent`

### `TabButton`

- Botón individual de pestaña
- Muestra label y contador
- Indicador visual de pestaña activa
- Estados: hover, active

### `TabContent`

- Renderiza los items de la pestaña activa
- Animación de fade-in al cambiar
- Mensaje vacío si no hay items

## Ejemplo Completo

Ver `AsideExample.tsx` para un ejemplo funcional completo.

## Notas

- El componente es un "Client Component" (`"use client"`)
- Usa Tailwind CSS para estilos
- La animación `fadeIn` está definida en `globals.css`
- Propiedades agnósticas: puedes pasar cualquier tipo de objeto como items
