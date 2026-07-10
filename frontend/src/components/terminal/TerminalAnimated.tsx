"use client";

import React, { useEffect, useRef, useState } from "react";
import { CommandType, useTerminal } from "../../context/TerminalContext";
import { usePathname, useRouter } from "next/navigation";
import { AnimatedLine } from "./AnimatedLine";

export default function TerminalAnimated() {
  const currentPath = usePathname();
  const router = useRouter();
  const { history, pushCommand, clearTerminal } = useTerminal();
  const [scrolled, setScrolled] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Refs for the input and container elements
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle the terminal click to focus the input field
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Detect scrolling to change the style of the top bar
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      setScrolled(el.scrollTop > 0);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll when history changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      container.scrollTop = container.scrollHeight;
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [history]);

  return (
    <div
      ref={containerRef}
      className={[
        "relative",
        "w-full h-48 px-4 pb-4 flex flex-col gap-1 md:px-6 lg:px-8",
        "bg-gradient-to-br from-white/[0.07] via-zinc-950/40 to-zinc-950/60",
        "border border-zinc-700/30 rounded-b-xl",
        "font-mono text-xs text-green-400 overflow-y-auto",
        "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shadow-slate-500/5",
        "backdrop-blur-[2px]",
        "terminal-scroll",
      ].join(" ")}
      onClick={handleTerminalClick}
    >
      {/* Barra superior estilo ventana de consola */}
      <div
        className={[
          "sticky top-0 flex items-center gap-2",
          "border-b border-zinc-900",
          "pb-2 -mx-4 px-4 md:mx-6 md:px-6 lg:-mx-8 lg:px-8",
          "text-zinc-500 select-none",
          "transition-all duration-700 ease-in-out",
          scrolled ? "bg-zinc-950/95" : "bg-zinc-950/5",
          scrolled ? "pt-2 mt-2" : "pt-5 -mt-5",
        ].join(" ")}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500/90 cursor-pointer active:bg-red-500/60"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500/90 cursor-pointer active:bg-yellow-500/60"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500/90 cursor-pointer active:bg-green-500/60"></span>
        <span className="ml-2 text-[10px]">
          bash - guillermo.concepcion@portfolio
        </span>
      </div>

      {/* Command History */}
      <div className="mt-6 flex-1 flex flex-col gap-1">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap ${
              line.type === CommandType.COMMAND
                ? "text-zinc-200"
                : line.type === CommandType.SYSTEM
                  ? "text-amber-500/90"
                  : line.type === CommandType.ERROR
                    ? "text-red-500/90"
                    : "text-green-500"
            }`}
          >
            <span>{line.text}</span>
          </div>
        ))}

        {/* Cursor parpadeante al final de la línea actual */}
        <div className="text-zinc-400 flex items-center gap-1 mt-0.5">
          <AnimatedLine
            text={`guillermo.concepcion@portfolio: ~${currentPath ? `${currentPath} ` : ""}$`}
            speed={35}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (inputValue.trim() !== "") {
                const commandLine = inputValue.trim().split(" ", 2);
                const command = commandLine[0];

                switch (command) {
                  case "clear":
                    // Clear the terminal history if the command is "clear"
                    clearTerminal();
                    break;

                  case "help":
                    // Provide help information if the command is "help"
                    pushCommand(
                      inputValue,
                      "Available commands: cd, clear, help, echo, ls, pwd, whoami, id",
                      CommandType.SYSTEM,
                    );
                    break;

                  case "echo":
                    // Regex to match the first argument after "echo", considering quotes and spaces
                    const regexCommand =
                      /^("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|[^\s]+)/;

                    // Match the first argument after "echo" using the regex
                    const match = commandLine[1]?.match(regexCommand);

                    // Extract the matched text and remove surrounding quotes if present
                    const cleanCommand = match
                      ? match[1].replace(/^["']|["']$/g, "")
                      : "";

                    // Echo the input value if the command is "echo" with a fixed length of 20 characters
                    pushCommand(inputValue, cleanCommand, CommandType.SYSTEM);
                    break;

                  case "ls":
                    const baseOutput =
                      ".\n..\nabout\ncontact\ncurriculum-vitae\ndashboard\nhome\nlogin\nprojects";
                    const secretOutput = "\n.s3cr3t";
                    if (
                      commandLine[1] === "-a" ||
                      commandLine[1] === "-al" ||
                      commandLine[1] === "-la"
                    ) {
                      pushCommand(
                        inputValue + " ~",
                        baseOutput + secretOutput,
                        CommandType.SYSTEM,
                      );
                    } else {
                      // List the contents of the current directory if the command is "ls"
                      pushCommand("ls ~", baseOutput, CommandType.SYSTEM);
                    }
                    break;

                  case "pwd":
                    // Print the current working directory if the command is "pwd"
                    pushCommand(
                      inputValue,
                      currentPath || "/",
                      CommandType.SYSTEM,
                    );
                    break;

                  case "whoami":
                    // Print the current user if the command is "whoami"
                    pushCommand(
                      inputValue,
                      "guillermo.concepcion",
                      CommandType.SYSTEM,
                    );
                    break;

                  case "id":
                    // Print the user ID if the command is "id"
                    pushCommand(
                      inputValue,
                      "uid=1001(guillermo.concepcion) gid=1001(guillermo.concepcion) groups=1001(guillermo.concepcion)",
                      CommandType.SYSTEM,
                    );
                    break;

                  case "cd":
                    const newPath = commandLine[1] || "/";
                    const ALLOWED_PATHS = [
                      ".",
                      "..",
                      "/",
                      "home",
                      "/home",
                      "projects",
                      "/projects",
                      "about",
                      "/about",
                      "login",
                      "/login",
                      "dashboard",
                      "/dashboard",
                    ];

                    if (newPath === "/.s3cr3t" || newPath === ".s3cr3t") {
                      router.push("/.s3cr3t");
                      pushCommand(
                        inputValue,
                        `Changed directory to: ${newPath}`,
                        CommandType.SYSTEM,
                      );
                    } else if (ALLOWED_PATHS.includes(newPath)) {
                      router.push(newPath);
                      pushCommand(
                        inputValue,
                        `Changed directory to: ${newPath}`,
                        CommandType.SYSTEM,
                      );
                    } else {
                      router.push("/404");
                      pushCommand(
                        inputValue,
                        `There's been an error trying to change directory to: ${newPath}`,
                        CommandType.ERROR,
                      );
                    }
                    break;

                  case "sudo":
                    pushCommand(
                      inputValue,
                      "Permission denied: you do not have the required privileges to execute this command.",
                      CommandType.ERROR,
                    );
                    break;

                  default:
                    pushCommand(
                      inputValue,
                      `Command not found: ${command}`,
                      CommandType.ERROR,
                    );
                    break;
                }

                setInputValue("");
              }
            }}
          >
            <input
              ref={inputRef}
              type="text"
              className="bg-transparent outline-none w-0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              maxLength={40}
            />
          </form>

          <span>{inputValue}</span>
          <span className="-m-1 w-2 h-3.5 bg-slate-200 animate-[pulse_1s_infinite]"></span>
        </div>
      </div>
    </div>
  );
}
