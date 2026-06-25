"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTerminal } from "../../context/TerminalContext";

// Subcomponente que se encarga de animar el texto letra por letra
function AnimatedLine({ text, speed = 40 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText(""); // Resetear al montar

    const interval = setInterval(() => {
      if (index < text.length) {
        // Añadimos la letra actual usando el índice
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}

export default function TerminalAnimated() {
  const { history } = useTerminal();
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll en el contenedor
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      setScrolled(el.scrollTop > 0);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll hacia abajo cada vez que cambie el historial
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div
      ref={containerRef}
      className={[
        "w-full h-[12rem] flex flex-col gap-1",
        "bg-gradient-to-br from-white/[0.07] via-zinc-950/40 to-zinc-950/60 border",
        "border-zinc-700/30 rounded-lg p-4 font-mono text-xs text-green-400 overflow-y-auto",
        "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shadow-green-500/5",
        "backdrop-blur-[2px]",
        "terminal-scroll",
      ].join(" ")}
    >
      {/* Barra superior estilo ventana de consola */}
      <div
        className={[
          `sticky top-0 flex items-center gap-2`,
          `border-b border-zinc-900`,
          `pb-2 mb-2 -mx-4 px-4`,
          `text-zinc-500 select-none`,
          `transition-[background-color] duration-500 ease-in-out ${scrolled ? "bg-zinc-950/95 pt-8 mt-10" : "bg-transparent pt-2 -mt-2"}`,
        ].join(" ")}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
        <span className="ml-2 text-[10px]">bash - guest@portfolio</span>
      </div>

      {/* Historial de comandos */}
      <div className="flex-1 flex flex-col gap-1">
        {history.map((line, idx) => {
          const isLast =
            idx === history.length - 1 ||
            (line.type === "command" &&
              idx === history.length - 2 &&
              history[idx + 1]?.type === "output");

          return (
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
              {/* Solo animamos si es un comando escrito por el usuario y es el último evento */}
              {line.type === "command" && isLast ? (
                <AnimatedLine text={line.text} speed={35} />
              ) : (
                <span>{line.text}</span>
              )}
            </div>
          );
        })}

        {/* Cursor parpadeante al final de la línea actual */}
        <div className="text-zinc-400 flex items-center gap-1 mt-0.5">
          <span>guest@portfolio:~$</span>
          <span className="w-2 h-3.5 bg-green-500 animate-[pulse_0.8s_infinite]"></span>
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
