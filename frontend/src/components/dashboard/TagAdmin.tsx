"use client";

import { useEffect, useState } from "react";
import { Tag } from "@/types";
import { createTag, deleteTag, updateTag } from "@/services/adminService";

interface TagAdminProps {
  token: string;
  tags: Tag[];
  onRefresh: () => void;
}

export function TagAdmin({ token, tags, onRefresh }: TagAdminProps) {
  const [selectedTagId, setSelectedTagId] = useState<string>("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Tag["category"]>("framework");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tag = tags.find((item) => item.id === selectedTagId);
    if (tag) {
      setName(tag.name);
      setCategory(tag.category);
    } else {
      setName("");
      setCategory("framework");
    }
  }, [selectedTagId, tags]);

  async function handleSave() {
    // validation
    if (!name || !name.trim()) {
      setError("El nombre es obligatorio.");
      setStatus("Corrige los errores del formulario.");
      return;
    }

    try {
      setError(null);
      setStatus("Guardando etiqueta...");
      if (selectedTagId) {
        await updateTag(token, selectedTagId, name, category);
        setStatus("Etiqueta actualizada correctamente.");
      } else {
        await createTag(token, name, category);
        setStatus("Etiqueta creada correctamente.");
      }
      setSelectedTagId("");
      onRefresh();
    } catch (err) {
      setStatus(`Error al guardar etiqueta: ${err}`);
    }
  }

  async function handleDelete() {
    if (!selectedTagId) {
      return;
    }

    try {
      setStatus("Eliminando etiqueta...");
      await deleteTag(token, selectedTagId);
      setStatus("Etiqueta eliminada correctamente.");
      setSelectedTagId("");
      onRefresh();
    } catch (error) {
      setStatus(`Error al eliminar etiqueta: ${error}`);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Etiquetas</h2>
          <p className="mt-2 text-slate-400">
            Administra las etiquetas para los proyectos.
          </p>
        </div>
        <select
          value={selectedTagId}
          onChange={(event) => setSelectedTagId(event.target.value)}
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
        >
          <option value="">Crear etiqueta nueva</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name} ({tag.category})
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block">
          <span className="text-sm text-slate-300">Nombre</span>
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setError(null);
            }}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
          {error ? <p className="mt-2 text-sm text-rose-400">{error}</p> : null}
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Categoría</span>
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as Tag["category"])
            }
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          >
            <option value="lenguaje">lenguaje</option>
            <option value="framework">framework</option>
            <option value="especialidad">especialidad</option>
          </select>
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          {selectedTagId ? "Actualizar etiqueta" : "Crear etiqueta"}
        </button>
        {selectedTagId ? (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full border border-rose-500 px-6 py-3 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/10"
          >
            Eliminar etiqueta
          </button>
        ) : null}
        <span className="text-sm text-slate-400">{status}</span>
      </div>
    </section>
  );
}
