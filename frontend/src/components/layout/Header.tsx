"use client";

import { useTerminal } from "@/context/TerminalContext";
import Link from "next/link";

const navigation = [
  { href: "/home", label: "Home" },
  { href: "/projects", label: "Proyectos" },
  { href: "/about", label: "About" },
  { href: "/curriculum-vitae", label: "My CV" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const terminal = useTerminal();
  const openLink = (label: string) => {
    terminal.pushCommand(label);
  };

  return (
    <header
      className={[
        "flex flex-col gap-6",
        "px-4 py-6 sm:px-6 lg:px-8",
        "border-b border-slate-800 pb-6",
        "md:flex-row md:items-center md:justify-between",
        // "bg-gradient-to-br from-white/[0.07] via-zinc-950/40 to-zinc-950/60",
        "border border-zinc-700/30 rounded-t-xl",
        "font-mono text-xs text-green-400 overflow-y-auto",
        "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shadow-green-500/5",
        "backdrop-blur-sm",
      ].join(" ")}
    >
      <div>
        <Link href="/home" className="text-2xl font-semibold text-zinc-100">
          Guillermo Concepción
        </Link>

        <p className="mt-2 text-sm text-slate-400 select-none">
          A professional portfolio driven by Next.js and NestJS.
        </p>
      </div>

      <nav className="flex flex-wrap gap-3 text-sm text-slate-300">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-2 transition hover:bg-slate-800 hover:text-white"
            onClick={() => openLink(`cd ${item.href}`)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
