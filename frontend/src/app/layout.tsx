import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TerminalProvider } from "@/context/TerminalContext";
import Terminal from "@/components/common/Terminal";
import TerminalModern from "@/components/common/TerminalModern";
import TerminalAnimated from "@/components/common/TerminalAnimated";

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
          <TerminalAnimated />

          {/* <div className="w-full flex justify-center min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8"> */}
          <Header />

          <main className="mx-auto flex flex-col justify-center flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>

          <Footer />
          {/* </div> */}
        </TerminalProvider>
      </body>
    </html>
  );
}
