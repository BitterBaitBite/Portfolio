export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl space-y-8 py-10">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-glow">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-sky-400">
          Professional portfolio
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Build your digital brand with clean code and modern architecture.
        </h1>
        <p className="mt-6 max-w-3xl text-slate-300">
          This portfolio scaffold connects a TypeScript NestJS backend with a
          Next.js frontend and includes projects, tags, about content, and an
          admin dashboard for secure content management.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/proyectos"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Ver proyectos
          </a>
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Admin login
          </a>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-glow">
          <h2 className="text-2xl font-semibold text-white">Frontend</h2>
          <p className="mt-4 text-slate-300">
            Next.js App Router, TailwindCSS styling, and typed API services for
            building a responsive portfolio.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-glow">
          <h2 className="text-2xl font-semibold text-white">Backend</h2>
          <p className="mt-4 text-slate-300">
            NestJS, Prisma, PostgreSQL, JWT auth, and a layered architecture for
            secure content management.
          </p>
        </div>
      </div>
    </section>
  );
}
