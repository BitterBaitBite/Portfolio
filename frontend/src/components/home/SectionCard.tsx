import type { ReactNode } from "react";
import DynamicLinkButton from "../common/DynamicLinkButton";
import ExternalLinkIcon from "../svg/ExternalLinkIcon";

interface SectionCardProps {
  children: ReactNode;
}

export default function SectionCard({ children }: SectionCardProps) {
  return (
    <div
      className={[
        "flex flex-col gap-2 flex-1",
        "rounded-sm border-r border-b border-zinc-700",
        "bg-zinc-950/20 hover:scale-[102%]",
        "hover:border-transparent border-0",
        "w-full px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-4",
        "transition-all duration-700 ease-out",
        "hover:bg-gradient-to-br from-white/[0.07] via-zinc-950/40 to-zinc-950/60",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
