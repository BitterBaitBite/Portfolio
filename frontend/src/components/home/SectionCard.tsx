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
        "w-full max-h-max px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-4",
        "shadow-[3px_3px_0px_0px] shadow-zinc-400/15",
        "hover:shadow-[0]",
        "bg-zinc-900/50 hover:scale-[102%]",
        "transition-all duration-700 ease-out",
        "hover:bg-gradient-to-br from-white/[0.07] via-zinc-950/50 to-zinc-950/70",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
