"use client";

import { useEffect, useState } from "react";
import { About } from "@/types";
import { upsertAbout } from "@/services/adminService";
import {
  AboutSection,
  parseAboutSections,
  serializeAboutSections,
} from "@/utils/aboutContent";

interface AboutAdminProps {
  token: string;
  about: About | null;
  onRefresh: () => void;
}

function createSection(): AboutSection {
  return { title: "", content: "", imageUrl: "", alignment: "left" };
}

export function AboutAdmin({ token, about, onRefresh }: AboutAdminProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [sections, setSections] = useState<AboutSection[]>([createSection()]);
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (about) {
      setTitle(about.title);
      setSubtitle(about.subtitle ?? "");
      setBody(about.body ?? "");
      setSections(parseAboutSections(about.body));
    }
  }, [about]);

  async function handleSave() {
    const fieldErrors: Record<string, string> = {};
    if (!title || !title.trim()) {
      fieldErrors.title = "El título es obligatorio.";
    }

    const hasContent =
      body.trim() ||
      sections.some(
        (section) =>
          section.title.trim() ||
          section.content.trim() ||
          section.imageUrl?.trim(),
      );

    if (!hasContent) {
      fieldErrors.body = "Agrega contenido o al menos un bloque.";
    }

    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) {
      setStatus("Corrige los errores del formulario.");
      return;
    }

    try {
      setStatus("Guardando contenido About...");
      const payload = serializeAboutSections(sections);
      await upsertAbout(token, {
        id: about?.id,
        title,
        subtitle,
        body: payload || body,
      });
      setStatus("Contenido About actualizado correctamente.");
      onRefresh();
    } catch (error) {
      setStatus(`Error al actualizar About: ${error}`);
    }
  }

  function updateSection(index: number, patch: Partial<AboutSection>) {
    setSections((current) =>
      current.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...patch } : section,
      ),
    );
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">About</h2>
        <p className="mt-2 text-slate-400">
          Gestiona el contenido de la sección About con bloques más flexibles y
          expresivos.
        </p>
      </div>

      <div className="space-y-4">
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

        <label className="block">
          <span className="text-sm text-slate-300">Subtítulo</span>
          <input
            value={subtitle}
            onChange={(event) => setSubtitle(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </label>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Bloques de contenido
            </h3>
            <button
              type="button"
              onClick={() =>
                setSections((current) => [...current, createSection()])
              }
              className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-200"
            >
              + Añadir bloque
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div
                key={`${index}-about-section`}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
              >
                <label className="block">
                  <span className="text-sm text-slate-300">
                    Título del bloque
                  </span>
                  <input
                    value={section.title}
                    onChange={(event) =>
                      updateSection(index, { title: event.target.value })
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                  />
                </label>

                <label className="mt-3 block">
                  <span className="text-sm text-slate-300">Contenido</span>
                  <textarea
                    value={section.content}
                    onChange={(event) =>
                      updateSection(index, { content: event.target.value })
                    }
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                  />
                </label>

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm text-slate-300">
                      Imagen del bloque
                    </span>
                    <input
                      value={section.imageUrl ?? ""}
                      onChange={(event) =>
                        updateSection(index, { imageUrl: event.target.value })
                      }
                      placeholder="https://..."
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-slate-300">
                      Posición de la imagen
                    </span>
                    <select
                      value={section.alignment ?? "left"}
                      onChange={(event) =>
                        updateSection(index, {
                          alignment: event.target.value as "left" | "right",
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    >
                      <option value="left">Izquierda</option>
                      <option value="right">Derecha</option>
                    </select>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSections((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                  className="mt-3 text-sm text-rose-400"
                >
                  Eliminar bloque
                </button>
              </div>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-sm text-slate-300">Resumen general</span>
          <textarea
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
              setErrors((e) => ({ ...e, body: "" }));
            }}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
          {errors.body ? (
            <p className="mt-2 text-sm text-rose-400">{errors.body}</p>
          ) : null}
        </label>
      </div>

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
