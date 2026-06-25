"use client";

import { useEffect, useState } from "react";
import { About } from "@/types";
import { upsertAbout } from "@/services/adminService";

interface AboutAdminProps {
  token: string;
  about: About | null;
  onRefresh: () => void;
}

export function AboutAdmin({ token, about, onRefresh }: AboutAdminProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (about) {
      setTitle(about.title);
      setSubtitle(about.subtitle ?? "");
      setBody(about.body);
    }
  }, [about]);

  async function handleSave() {
    // validation
    const fieldErrors: Record<string, string> = {};
    if (!title || !title.trim())
      fieldErrors.title = "El título es obligatorio.";
    if (!body || !body.trim())
      fieldErrors.body = "La descripción es obligatoria.";
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) {
      setStatus("Corrige los errores del formulario.");
      return;
    }

    try {
      setStatus("Guardando contenido About...");
      await upsertAbout(token, {
        id: about?.id,
        title,
        subtitle,
        body,
      });
      setStatus("Contenido About actualizado correctamente.");
      onRefresh();
    } catch (error) {
      setStatus(`Error al actualizar About: ${error}`);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">About</h2>
        <p className="mt-2 text-slate-400">
          Gestiona el contenido de la sección About de tu portfolio.
        </p>
      </div>

      <label className="block">
        <span className="text-sm text-slate-300">Título</span>
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setErrors((e) => ({ ...e, title: "" }));
          }}
          className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
        />
        {errors.title ? (
          <p className="mt-2 text-sm text-rose-400">{errors.title}</p>
        ) : null}
      </label>
      <label className="block mt-4">
        <span className="text-sm text-slate-300">Subtítulo</span>
        <input
          value={subtitle}
          onChange={(event) => setSubtitle(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
        />
      </label>
      <label className="block mt-4">
        <span className="text-sm text-slate-300">Descripción</span>
        <textarea
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
            setErrors((e) => ({ ...e, body: "" }));
          }}
          rows={5}
          className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
        />
        {errors.body ? (
          <p className="mt-2 text-sm text-rose-400">{errors.body}</p>
        ) : null}
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          Guardar About
        </button>
        <span className="text-sm text-slate-400">{status}</span>
      </div>
    </section>
  );
}
