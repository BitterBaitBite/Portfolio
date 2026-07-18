/**
 * AsideExample - Componente de ejemplo que muestra cómo usar el componente Aside
 *
 * Este componente demuestra cómo:
 * 1. Preparar datos genéricos como arrays de objetos
 * 2. Renderizar items de forma personalizada
 * 3. Integrar el componente Aside en tu página
 */

import Aside, { TabItem } from "./Aside";

interface ExampleItem extends TabItem {
  title: string;
  description: string;
  icon?: string;
}

const devItems: ExampleItem[] = [
  {
    id: "dev-1",
    title: "React Development",
    description: "Building modern web applications with React",
  },
  {
    id: "dev-2",
    title: "TypeScript",
    description: "Type-safe JavaScript development",
  },
  {
    id: "dev-3",
    title: "Next.js",
    description: "Full-stack React framework",
  },
];

const cyberItems: ExampleItem[] = [
  {
    id: "cyber-1",
    title: "Network Security",
    description: "Securing network communications",
  },
  {
    id: "cyber-2",
    title: "Penetration Testing",
    description: "Authorized security assessments",
  },
];

const gameDevItems: ExampleItem[] = [
  {
    id: "game-1",
    title: "Unity Development",
    description: "3D game development with Unity",
  },
  {
    id: "game-2",
    title: "Game Design",
    description: "Creating engaging game mechanics",
  },
  {
    id: "game-3",
    title: "Graphics Programming",
    description: "Advanced rendering techniques",
  },
];

const renderExampleItem = (item: TabItem) => {
  const exampleItem = item as ExampleItem;
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold text-white text-sm">{exampleItem.title}</h4>
      <p className="text-slate-400 text-xs leading-relaxed">
        {exampleItem.description}
      </p>
    </div>
  );
};

export default function AsideExample() {
  return (
    <Aside
      devItems={devItems}
      cyberItems={cyberItems}
      gameDevItems={gameDevItems}
      renderItem={renderExampleItem}
    />
  );
}
