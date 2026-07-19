interface TabButtonProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

export default function TabButton({
  label,
  count,
  isActive,
  onClick,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-2 sm:px-4 sm:py-2 lg:px-5",
        "text-sm font-medium transition-all duration-300 ease-out",
        "relative",
        isActive ? "text-white" : "text-slate-400 hover:text-slate-300",
      ].join(" ")}
    >
      <span className="flex items-center gap-1.5">
        {label}
        <span
          className={[
            "text-xs font-semibold px-2 py-1 rounded",
            "transition-all duration-300 ease-out",
            isActive
              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400"
              : "bg-zinc-800/50 text-slate-500",
          ].join(" ")}
        >
          {count}
        </span>
      </span>

      {/* Active indicator */}
      {isActive && (
        <div
          className={[
            "absolute bottom-0 left-0 right-0 h-0.5",
            "bg-gradient-to-r from-cyan-500 to-blue-500",
            "transition-all duration-300 ease-out",
          ].join(" ")}
        />
      )}
    </button>
  );
}
