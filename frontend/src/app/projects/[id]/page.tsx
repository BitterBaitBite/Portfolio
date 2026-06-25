"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProject } from "@/services/projectService";
import { Project } from "@/types";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string | undefined;
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!projectId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    getProject(projectId)
      .then(setProject)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [projectId]);

  if (!projectId) {
    return (
      <p className="py-10 text-center text-slate-300">
        ID de proyecto no válido.
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6 py-10">
      {isLoading ? (
        <p className="text-slate-300">Cargando proyecto...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : project ? (
        <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-glow">
          <h1 className="text-4xl font-semibold text-white">{project.title}</h1>
          {project.subtitle ? (
            <p className="mt-3 text-lg text-slate-300">{project.subtitle}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <p className="mt-8 text-slate-300">{project.description}</p>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Ver proyecto en vivo
            </a>
          ) : null}
        </article>
      ) : (
        <p className="text-slate-300">No se encontró el proyecto solicitado.</p>
      )}
    </section>
  );
}
