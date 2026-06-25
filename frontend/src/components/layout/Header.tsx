import Link from "next/link";

const navigation = [
  { href: "/home", label: "Home" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/about", label: "About" },
  { href: "/login", label: "Login" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Header() {
  return (
    <header
      className={[
        "mb-8 flex flex-col gap-6",
        "px-4 py-6 sm:px-6 lg:px-8",
        "border-b border-slate-800 pb-6",
        "md:flex-row md:items-center md:justify-between",
      ].join(" ")}
    >
      <div>
        <Link href="/home" className="text-2xl font-semibold text-white">
          Guillermo Concepción - Portfolio
        </Link>

        <p className="mt-2 text-sm text-slate-400">
          A professional portfolio driven by Next.js and NestJS.
        </p>
      </div>

      <nav className="flex flex-wrap gap-3 text-sm text-slate-300">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-2 transition hover:bg-slate-800 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
