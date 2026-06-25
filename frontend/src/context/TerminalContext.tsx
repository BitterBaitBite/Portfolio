"use client";

import { MOTD } from "@/components/common/MOTD";
import React, { createContext, useContext, useState, useCallback } from "react";

interface TerminalLine {
  text: string;
  type: "command" | "output" | "system";
}

interface TerminalContextType {
  history: TerminalLine[];
  pushCommand: (cmd: string, output?: string) => void;
  clearTerminal: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(
  undefined,
);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: MOTD, type: "system" },
    { text: "systemctl start portfolio-shell.service", type: "system" },
    { text: "Status: Online. Ready for interaction.", type: "output" },
  ]);

  const pushCommand = useCallback((cmd: string, output?: string) => {
    setHistory((prev) => {
      const nextHistory: TerminalLine[] = [
        ...prev,
        { text: `guest@portfolio:~$ ${cmd}`, type: "command" },
      ];

      if (output) {
        nextHistory.push({ text: output, type: "output" });
      }

      return nextHistory;
    });
  }, []);

  const clearTerminal = useCallback(() => setHistory([]), []);

  return (
    <TerminalContext.Provider value={{ history, pushCommand, clearTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
}

// Custom Hook para usar la terminal desde cualquier componente
export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal debe usarse dentro de un TerminalProvider");
  }
  return context;
}
