"use client";

import React, { useEffect, useRef } from "react";
import { useTerminal } from "../../context/TerminalContext";

export default function Terminal() {
  const { history } = useTerminal();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll hacia abajo cada vez que aparece un comando nuevo
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-mono text-xs text-green-400 overflow-y-auto shadow-2xl flex flex-col gap-1">
      {/* Barra superior estilo ventana */}
      <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 mb-2 text-zinc-500 select-none">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
        <span className="ml-2 text-[10px]">bash - guest@portfolio</span>
      </div>

      {/* Historial de comandos */}
      <div className="flex-1 flex flex-col gap-1">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap ${
              line.type === "command"
                ? "text-zinc-200"
                : line.type === "system"
                  ? "text-amber-500/90"
                  : "text-green-400"
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
