import { TabItem } from "./Aside";

interface TabContentProps {
  items: TabItem[];
  renderItem: (item: TabItem) => React.ReactNode;
  activeTab: string;
}

export default function TabContent({
  items,
  renderItem,
  activeTab,
}: TabContentProps) {
  return (
    <div
      key={activeTab}
      className={["flex flex-col gap-3", "animate-fadeIn"].join(" ")}
    >
      {items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.id}
            className={[
              "p-3 sm:p-4",
              "rounded-md",
              "bg-zinc-800/30 hover:bg-zinc-800/50",
              "border border-zinc-700/30 hover:border-cyan-500/30",
              "transition-all duration-300 ease-out",
              "hover:shadow-[0_0_12px_rgba(34,211,238,0.1)]",
            ].join(" ")}
          >
            {renderItem(item)}
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-500 text-sm">No items available</p>
        </div>
      )}
    </div>
  );
}
