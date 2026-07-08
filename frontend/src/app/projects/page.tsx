"use client";

import { SetStateAction, useEffect, useState } from "react";
import { getProjects, getTags } from "@/services/projectService";
import { useProjectFilters } from "@/hooks/useProjectFilters";
import { Project, Tag } from "@/types";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilters from "@/components/projects/ProjectFilters";

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
    activeTags,
    toggleTag,
    resetFilters,
    queryString,
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
    <section
      className={[
        "flex flex-col gap-2 sm:gap-4 md:gap-6",
        "px-4 py-2 sm:p-6 lg:p-8",
      ].join(" ")}
    >
      <h1 className="text-3xl font-semibold text-white">Proyectos</h1>

      {/* FILTERS */}
      <ProjectFilters
        error={error}
        isLoading={isLoading}
        projects={projects}
        title={title}
        setTitle={setTitle}
        subtitle={subtitle}
        setSubtitle={setSubtitle}
        tags={tags}
        toggleTag={toggleTag}
        activeTags={activeTags}
        resetFilters={resetFilters}
        queryString={queryString}
      />

      {/* PROJECTS */}
      <div
        className={[
          "grid gap-6",
          projects.length > 0 && projects.length % 3 == 0
            ? "lg:grid-cols-3"
            : "lg:grid-cols-2",
        ].join(" ")}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
