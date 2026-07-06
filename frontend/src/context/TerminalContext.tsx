"use client";

import { MOTD_ES, MOTD_EN } from "@/components/terminal/MOTD";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useState, useCallback } from "react";

export const enum CommandType {
  COMMAND = "command",
  OUTPUT = "output",
  SYSTEM = "system",
  ERROR = "error",
}

interface TerminalLine {
  text: string;
  type: CommandType;
}

interface TerminalContextType {
  history: TerminalLine[];
  pushCommand: (cmd: string, output?: string, type?: CommandType) => void;
  clearTerminal: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(
  undefined,
);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: MOTD_EN, type: CommandType.SYSTEM },
    {
      text: "systemctl start portfolio-shell.service",
      type: CommandType.SYSTEM,
    },
    {
      text: "Status: Online. Ready for interaction.",
      type: CommandType.OUTPUT,
    },
  ]);

  const pushCommand = useCallback(
    (cmd: string, output?: string, type: CommandType = CommandType.COMMAND) => {
      setHistory((prev) => {
        const nextHistory: TerminalLine[] = [
          ...prev,
          {
            text: `guillermo.concepcion@portfolio: ~${currentPath ? `${currentPath} ` : ""}$ ${cmd}`,
            type: CommandType.COMMAND,
          },
        ];

        if (output) {
          nextHistory.push({ text: output, type: type });
        }

        return nextHistory;
      });
    },
    [currentPath],
  );

  const clearTerminal = useCallback(() => setHistory([]), []);

  return (
    <TerminalContext.Provider value={{ history, pushCommand, clearTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
}

// Custom Hook for consuming the TerminalContext
export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal debe usarse dentro de un TerminalProvider");
  }
  return context;
}
