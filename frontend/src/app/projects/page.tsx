"use client";

import { useEffect, useState } from "react";
import { getProjects, getTags } from "@/services/projectService";
import { useProjectFilters } from "@/hooks/useProjectFilters";
import { Project, Tag } from "@/types";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    title,
    setTitle,
    subtitle,
    setSubtitle,
    tags: activeTags,
    toggleTag,
    resetFilters,
  } = useProjectFilters([]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getProjects({ title, subtitle, tags: activeTags })
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [title, subtitle, activeTags]);

  useEffect(() => {
    getTags()
      .then(setTags)
      .catch(() => setTags([]));
  }, []);

  return (
    <section className="mx-auto max-w-6xl space-y-8 py-10">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-glow">
        <h1 className="text-3xl font-semibold text-white">Proyectos</h1>
        <p className="mt-3 text-slate-300">
          Filtra por título, subtítulo o etiquetas para encontrar el proyecto
          ideal.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Buscar por título"
                className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
              />
              <input
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
                placeholder="Buscar por subtítulo"
                className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
              />
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-slate-400">
                Etiquetas
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const active = activeTags.includes(tag.name);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.name)}
                      className={`rounded-full px-3 py-2 text-sm transition ${
                        active
                          ? "bg-sky-500 text-slate-950"
                          : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 text-sm text-slate-400 underline decoration-slate-600 hover:text-slate-100"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 text-slate-300">
            <h2 className="text-xl font-semibold text-white">Resultados</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Los filtros se aplican automáticamente al backend para mantener
              resultados actualizados y rápidos.
            </p>
            {isLoading ? (
              <p className="mt-4 text-slate-300">Cargando proyectos...</p>
            ) : error ? (
              <p className="mt-4 text-red-400">{error}</p>
            ) : (
              <p className="mt-4 text-slate-300">
                {projects.length} proyecto(s) encontrados.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
