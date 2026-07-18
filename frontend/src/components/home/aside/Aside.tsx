"use client";

import { useState } from "react";
import TabButton from "./TabButton";
import TabContent from "./TabContent";

export interface TabItem {
  id: string;
  [key: string]: any;
}

export interface AsideProps {
  devItems: TabItem[];
  cyberItems: TabItem[];
  gameDevItems: TabItem[];
  renderItem: (item: TabItem) => React.ReactNode;
}

type TabType = "dev" | "cyber" | "gamedev";

export default function Aside({
  devItems,
  cyberItems,
  gameDevItems,
  renderItem,
}: AsideProps) {
  const [activeTab, setActiveTab] = useState<TabType>("dev");

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: "dev", label: "Dev", count: devItems.length },
    { id: "cyber", label: "Cyber", count: cyberItems.length },
    { id: "gamedev", label: "GameDev", count: gameDevItems.length },
  ];

  const getItemsByTab = (tab: TabType) => {
    switch (tab) {
      case "dev":
        return devItems;
      case "cyber":
        return cyberItems;
      case "gamedev":
        return gameDevItems;
      default:
        return [];
    }
  };

  return (
    <aside
      className={[
        "flex flex-col gap-4",
        "w-full md:w-80",
        "px-2 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8",
        "rounded-lg",
        "shadow-[3px_3px_0px_0px] shadow-zinc-400/15",
        "hover:shadow-[0]",
        "bg-zinc-900/50",
        "transition-all duration-700 ease-out",
        "hover:bg-gradient-to-br from-white/[0.07] via-zinc-950/50 to-zinc-950/70",
      ].join(" ")}
    >
      {/* Tab Buttons */}
      <div className="flex gap-2 border-b border-zinc-700/50">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            count={tab.count}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {/* Tab Content */}
      <TabContent
        items={getItemsByTab(activeTab)}
        renderItem={renderItem}
        activeTab={activeTab}
      />
    </aside>
  );
}
