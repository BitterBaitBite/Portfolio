import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TerminalProvider } from "@/context/TerminalContext";
import Terminal from "@/components/terminal/Terminal";
import TerminalModern from "@/components/terminal/TerminalModern";
import TerminalAnimated from "@/components/terminal/TerminalAnimated";

export const metadata = {
  title: "Personal Portfolio",
  description:
    "Professional portfolio built with Next.js, TypeScript and TailwindCSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen pattern-dark bg-size-[15px_15px] text-slate-100">
        <TerminalProvider>
          <Header />

          <TerminalAnimated />

          <main
            className={[
              "mx-auto flex flex-col justify-center flex-1 px-4 py-6 sm:px-6 lg:px-8",
              "border border-zinc-700/30 rounded-lg",
              "font-mono text-xs text-green-400 overflow-y-auto",
              "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shadow-slate-500/5",
              "backdrop-blur-sm",
            ].join(" ")}
          >
            {children}
          </main>

          <Footer />
          {/* </div> */}
        </TerminalProvider>
      </body>
    </html>
  );
}
