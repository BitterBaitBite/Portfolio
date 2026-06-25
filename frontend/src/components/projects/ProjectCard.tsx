import Link from "next/link";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow transition hover:-translate-y-1 hover:border-slate-700">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">{project.title}</h2>
          {project.subtitle ? (
            <p className="text-sm text-slate-400">{project.subtitle}</p>
          ) : null}
        </div>
        <Link
          href={`/proyectos/${project.id}`}
          className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
        >
          Ver
        </Link>
      </div>
      <p className="text-slate-300">{project.brief}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag.id}
            className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-widest text-slate-300"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </article>
  );
}
