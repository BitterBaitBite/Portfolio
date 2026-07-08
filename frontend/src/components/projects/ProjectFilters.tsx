"use client";
import { Project, Tag } from "@/types";
import { Dispatch, SetStateAction } from "react";
import CloseCircleIcon from "../svg/CloseCircleIcon";
import TagButton from "./TagButton";

export interface ProjectFilterProps {
  activeTags: string[];
  isLoading: boolean;
  error: string | null;
  projects: Project[];
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  subtitle: string;
  setSubtitle: Dispatch<SetStateAction<string>>;
  tags: Tag[];
  toggleTag: (tag: string) => void;
  resetFilters: () => void;
  queryString: string;
}

export default function ProjectFilters({
  error,
  isLoading,
  projects,
  title,
  setTitle,
  subtitle,
  setSubtitle,
  tags,
  activeTags,
  toggleTag,
  resetFilters,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 md:gap-6">
      {activeTags.length > 0 && (
        <div
          className={[
            "flex flex-col gap-4",
            "px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-4",
            "rounded-sm border border-slate-800 bg-slate-900/20 text-slate-500",
          ].join(" ")}
        >
          <h2 className="text-lg font-semibold text-white">Resultados</h2>

          {isLoading ? (
            <p className="text-slate-300">Cargando proyectos...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <p className="text-slate-300">
              {projects.length} proyecto(s) encontrados.
            </p>
          )}
        </div>
      )}

      {/* SEARCH */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-4">
        <div className="flex flex-col gap-2 w-1/2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Buscar por título"
            className="rounded-sm border border-slate-800 bg-slate-950/20 px-4 py-2 text-slate-100 outline-none transition focus:border-sky-500"
          />

          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Buscar por subtítulo"
            className="rounded-sm border border-slate-800 bg-slate-950/20 px-4 py-2 text-slate-100 outline-none transition focus:border-sky-500"
          />
        </div>

        {/* TAGS */}
        <div
          className={[
            "flex flex-col gap-2",
            "rounded-sm border border-slate-800 bg-slate-950/20 px-4 py-2",
          ].join(" ")}
        >
          <p className="display-none text-sm uppercase tracking-[0.25em] text-slate-400 md:display-block">
            Etiquetas
          </p>

          <div className="flex flex-wrap gap-1 content-evenly items-center">
            <>
              {tags.map((tag) => {
                const active = activeTags.includes(tag.name);

                return (
                  <TagButton
                    key={tag.name}
                    tag={tag}
                    toggleTag={toggleTag}
                    active={active}
                  />
                );
              })}
            </>

            <button
              onClick={resetFilters}
              className={[
                "w-6 h-6",
                "rounded-full transition",
                activeTags.length > 0
                  ? "bg-sky-500 text-slate-950 hover:bg-sky-600"
                  : "bg-transparent text-slate-700 hover:text-slate-800",
              ].join(" ")}
            >
              <CloseCircleIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
