import Link from "next/link";

interface DynamicLinkButtonProps {
  href: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  external?: boolean;
}

export default function DynamicLinkButton({
  href,
  text,
  icon: Icon,
  className = "",
  external = false,
}: DynamicLinkButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "group",
        "flex flex-row justify-end",
        "mt-2 w-36 h-8 self-end p-0.5",
        "rounded-full border-2 border-slate-500",
        "transition-all duration-300 ease-in-out",
        className,
      ].join(" ")}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={text}
    >
      <div
        className={[
          "flex flex-row align-middle justify-center",
          "min-w-max w-40 h-max px-3 py-1 group-hover:w-0 group-hover:px-1",
          "rounded-full bg-slate-500 text-slate-300 group-hover:bg-slate-400",
          "transition-[width,color] duration-500 ease-in-out",
        ].join(" ")}
      >
        <span
          className={[
            "block overflow-hidden text-center",
            "max-w-max w-40 max-h-max h-4 group-hover:w-0 group-hover:h-0",
            "transition-[width] duration-500 ease-in-out",
          ].join(" ")}
        >
          {text}
        </span>

        <span
          className={[
            "block overflow-hidden",
            "w-0 h-0 group-hover:w-4 group-hover:h-4 self-end",
            "transition-[width] duration-500 ease-in-out",
          ].join(" ")}
        >
          <Icon className="w-max h-max text-slate-50" />
        </span>
      </div>
    </Link>
  );
}
