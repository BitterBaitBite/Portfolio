"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Project, Tag } from "@/types";
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/services/adminService";

interface ProjectAdminProps {
  token: string;
  projects: Project[];
  tags: Tag[];
  onRefresh: () => void;
}

const emptyProject = {
  title: "",
  subtitle: "",
  brief: "",
  description: "",
  url: "",
  thumbnail: "",
  image: "",
  tagIds: [] as string[],
};

export function ProjectAdmin({
  token,
  projects,
  tags,
  onRefresh,
}: ProjectAdminProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [projectForm, setProjectForm] =
    useState<typeof emptyProject>(emptyProject);
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!selectedProjectId) {
      setProjectForm(emptyProject);
      return;
    }

    const selected = projects.find(
      (project) => project.id === selectedProjectId,
    );
    if (selected) {
      setProjectForm({
        title: selected.title,
        subtitle: selected.subtitle ?? "",
        brief: selected.brief,
        description: selected.description,
        url: selected.url ?? "",
        thumbnail: selected.thumbnail ?? "",
        image: selected.image ?? "",
        tagIds: selected.tags.map((tag) => tag.id),
      });
    }
  }, [projects, selectedProjectId]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId),
    [projects, selectedProjectId],
  );

  async function handleSave() {
    // client-side validation
    const fieldErrors: Record<string, string> = {};
    if (!projectForm.title || !projectForm.title.trim())
      fieldErrors.title = "El título es obligatorio.";
    if (!projectForm.brief || !projectForm.brief.trim())
      fieldErrors.brief = "El resumen breve es obligatorio.";
    if (!projectForm.description || !projectForm.description.trim())
      fieldErrors.description = "La descripción es obligatoria.";

    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) {
      setStatus("Corrige los errores del formulario.");
      return;
    }

    try {
      setStatus("Guardando...");

      const payload = {
        ...projectForm,
        url: projectForm.url || undefined,
        thumbnail: projectForm.thumbnail || undefined,
        image: projectForm.image || undefined,
      };

      if (selectedProjectId) {
        await updateProject(token, selectedProjectId, payload);
        setStatus("Proyecto actualizado correctamente.");
      } else {
        await createProject(token, payload);
        setStatus("Proyecto creado correctamente.");
      }

      setSelectedProjectId("");
      setProjectForm(emptyProject);

      onRefresh();
    } catch (error) {
      setStatus(`Error al guardar: ${error}`);
    }
  }

  async function handleDelete() {
    if (!selectedProjectId) {
      return;
    }

    try {
      setStatus("Eliminando proyecto...");
      await deleteProject(token, selectedProjectId);
      setStatus("Proyecto eliminado correctamente.");
      setSelectedProjectId("");
      setProjectForm(emptyProject);
      onRefresh();
    } catch (error) {
      setStatus(`Error al eliminar: ${error}`);
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setProjectForm((current) => ({ ...current, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  }

  function handleToggleTag(tagId: string) {
    setProjectForm((current) => ({
      ...current,
      tagIds: current.tagIds.includes(tagId)
        ? current.tagIds.filter((id) => id !== tagId)
        : [...current.tagIds, tagId],
    }));
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Proyectos</h2>
          <p className="mt-2 text-slate-400">
            Administra los proyectos mostrados en el frontend.
          </p>
        </div>
        <select
          value={selectedProjectId}
          onChange={(event) => setSelectedProjectId(event.target.value)}
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
        >
          <option value="">Crear proyecto nuevo</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="text-sm text-slate-300">Título</span>
            <input
              name="title"
              value={projectForm.title}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
            />
            {errors.title ? (
              <p className="mt-2 text-sm text-rose-400">{errors.title}</p>
            ) : null}
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Subtítulo</span>
            <input
              name="subtitle"
              value={projectForm.subtitle}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm text-slate-300">Resumen breve</span>
          <textarea
            name="brief"
            value={projectForm.brief}
            onChange={handleInputChange}
            rows={3}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
          {errors.brief ? (
            <p className="mt-2 text-sm text-rose-400">{errors.brief}</p>
          ) : null}
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Descripción</span>
          <textarea
            name="description"
            value={projectForm.description}
            onChange={handleInputChange}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
          {errors.description ? (
            <p className="mt-2 text-sm text-rose-400">{errors.description}</p>
          ) : null}
        </label>
        <div className="grid gap-4 lg:grid-cols-3">
          <label className="block">
            <span className="text-sm text-slate-300">URL</span>
            <input
              name="url"
              value={projectForm.url}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Thumbnail</span>
            <input
              name="thumbnail"
              value={projectForm.thumbnail}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Imagen</span>
            <input
              name="image"
              value={projectForm.image}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
            />
          </label>
        </div>
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-400">
            Etiquetas
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const active = projectForm.tagIds.includes(tag.id);
              return (
                <button
                  type="button"
                  key={tag.id}
                  onClick={() => handleToggleTag(tag.id)}
                  className={`rounded-full px-3 py-2 text-xs font-medium transition ${
                    active
                      ? "bg-sky-500 text-slate-950"
                      : "border border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          {selectedProject ? "Actualizar proyecto" : "Crear proyecto"}
        </button>
        {selectedProject ? (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full border border-rose-500 px-6 py-3 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/10"
          >
            Eliminar proyecto
          </button>
        ) : null}
        <span className="text-sm text-slate-400">{status}</span>
      </div>
    </section>
  );
}
