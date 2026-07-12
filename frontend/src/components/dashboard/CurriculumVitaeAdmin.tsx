"use client";

import { useEffect, useState } from "react";
import { CurriculumVitae } from "@/types";
import { upsertCurriculumVitae } from "@/services/adminService";

type ExperienceEntry = {
  role: string;
  organization: string;
  period: string;
  description: string;
};

type EducationEntry = {
  degree: string;
  institution: string;
  period: string;
  details: string;
};

type CredentialEntry = {
  name: string;
  issuer: string;
  year: string;
};

type LanguageEntry = {
  name: string;
  proficiency: string;
};

interface CurriculumVitaeAdminProps {
  token: string;
  curriculumVitae: CurriculumVitae | null;
  onRefresh: () => void;
}

function createExperienceEntry(): ExperienceEntry {
  return { role: "", organization: "", period: "", description: "" };
}

function createEducationEntry(): EducationEntry {
  return { degree: "", institution: "", period: "", details: "" };
}

function createCredentialEntry(): CredentialEntry {
  return { name: "", issuer: "", year: "" };
}

function createLanguageEntry(): LanguageEntry {
  return { name: "", proficiency: "" };
}

function parseStructuredItem<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function parseExperienceEntries(items?: string[]) {
  return (items ?? []).map((item) => {
    const parsed = parseStructuredItem<ExperienceEntry>(item);
    return (
      parsed ?? { role: item, organization: "", period: "", description: "" }
    );
  });
}

function parseEducationEntries(items?: string[]) {
  return (items ?? []).map((item) => {
    const parsed = parseStructuredItem<EducationEntry>(item);
    return parsed ?? { degree: item, institution: "", period: "", details: "" };
  });
}

function parseCredentialEntries(items?: string[]) {
  return (items ?? []).map((item) => {
    const parsed = parseStructuredItem<CredentialEntry>(item);
    return parsed ?? { name: item, issuer: "", year: "" };
  });
}

function parseLanguageEntries(items?: string[]) {
  return (items ?? []).map((item) => {
    const parsed = parseStructuredItem<LanguageEntry>(item);
    return parsed ?? { name: item, proficiency: "" };
  });
}

function serializeEntries<T>(entries: T[]) {
  return entries
    .filter((entry) => {
      if (typeof entry === "object" && entry !== null) {
        return Object.values(entry as Record<string, unknown>).some((value) =>
          typeof value === "string" ? value.trim() : Boolean(value),
        );
      }
      return Boolean(entry);
    })
    .map((entry) => JSON.stringify(entry));
}

export function CurriculumVitaeAdmin({
  token,
  curriculumVitae,
  onRefresh,
}: CurriculumVitaeAdminProps) {
  const [summary, setSummary] = useState("");
  const [experienceEntries, setExperienceEntries] = useState<ExperienceEntry[]>(
    [createExperienceEntry()],
  );
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    createEducationEntry(),
  ]);
  const [credentialEntries, setCredentialEntries] = useState<CredentialEntry[]>(
    [createCredentialEntry()],
  );
  const [languageEntries, setLanguageEntries] = useState<LanguageEntry[]>([
    createLanguageEntry(),
  ]);
  const [fileUrl, setFileUrl] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (curriculumVitae) {
      setSummary(curriculumVitae.summary ?? "");
      setExperienceEntries(
        curriculumVitae.experience?.length
          ? parseExperienceEntries(curriculumVitae.experience)
          : [createExperienceEntry()],
      );
      setEducationEntries(
        curriculumVitae.education?.length
          ? parseEducationEntries(curriculumVitae.education)
          : [createEducationEntry()],
      );
      setCredentialEntries(
        curriculumVitae.credentials?.length
          ? parseCredentialEntries(curriculumVitae.credentials)
          : [createCredentialEntry()],
      );
      setLanguageEntries(
        curriculumVitae.languages?.length
          ? parseLanguageEntries(curriculumVitae.languages)
          : [createLanguageEntry()],
      );
      setFileUrl(curriculumVitae.fileUrl ?? "");
    }
  }, [curriculumVitae]);

  async function handleSave() {
    try {
      setStatus("Guardando currículum...");
      await upsertCurriculumVitae(token, {
        id: curriculumVitae?.id,
        summary,
        experience: serializeEntries(experienceEntries),
        education: serializeEntries(educationEntries),
        credentials: serializeEntries(credentialEntries),
        languages: serializeEntries(languageEntries),
        fileUrl,
      });
      setStatus("Currículum actualizado correctamente.");
      onRefresh();
    } catch (error) {
      setStatus(`Error al actualizar currículum: ${error}`);
    }
  }

  function updateExperienceEntry(
    index: number,
    patch: Partial<ExperienceEntry>,
  ) {
    setExperienceEntries((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, ...patch } : entry,
      ),
    );
  }

  function updateEducationEntry(index: number, patch: Partial<EducationEntry>) {
    setEducationEntries((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, ...patch } : entry,
      ),
    );
  }

  function updateCredentialEntry(
    index: number,
    patch: Partial<CredentialEntry>,
  ) {
    setCredentialEntries((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, ...patch } : entry,
      ),
    );
  }

  function updateLanguageEntry(index: number, patch: Partial<LanguageEntry>) {
    setLanguageEntries((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, ...patch } : entry,
      ),
    );
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">Currículum Vitae</h2>
        <p className="mt-2 text-slate-400">
          Gestiona la información pública del CV con secciones más claras y
          fáciles de editar.
        </p>
      </div>

      <div className="space-y-6">
        <label className="block">
          <span className="text-sm text-slate-300">Resumen</span>
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </label>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Experiencia laboral
            </h3>
            <button
              type="button"
              onClick={() =>
                setExperienceEntries((current) => [
                  ...current,
                  createExperienceEntry(),
                ])
              }
              className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-200"
            >
              + Añadir
            </button>
          </div>

          <div className="space-y-4">
            {experienceEntries.map((entry, index) => (
              <div
                key={`${index}-experience`}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm text-slate-300">Cargo</span>
                    <input
                      value={entry.role}
                      onChange={(event) =>
                        updateExperienceEntry(index, {
                          role: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-slate-300">Empresa</span>
                    <input
                      value={entry.organization}
                      onChange={(event) =>
                        updateExperienceEntry(index, {
                          organization: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-slate-300">Periodo</span>
                    <input
                      value={entry.period}
                      onChange={(event) =>
                        updateExperienceEntry(index, {
                          period: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-sm text-slate-300">Descripción</span>
                    <textarea
                      value={entry.description}
                      onChange={(event) =>
                        updateExperienceEntry(index, {
                          description: event.target.value,
                        })
                      }
                      rows={3}
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setExperienceEntries((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                  className="mt-3 text-sm text-rose-400"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Educación</h3>
            <button
              type="button"
              onClick={() =>
                setEducationEntries((current) => [
                  ...current,
                  createEducationEntry(),
                ])
              }
              className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-200"
            >
              + Añadir
            </button>
          </div>

          <div className="space-y-4">
            {educationEntries.map((entry, index) => (
              <div
                key={`${index}-education`}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm text-slate-300">Titulación</span>
                    <input
                      value={entry.degree}
                      onChange={(event) =>
                        updateEducationEntry(index, {
                          degree: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-slate-300">Institución</span>
                    <input
                      value={entry.institution}
                      onChange={(event) =>
                        updateEducationEntry(index, {
                          institution: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-slate-300">Periodo</span>
                    <input
                      value={entry.period}
                      onChange={(event) =>
                        updateEducationEntry(index, {
                          period: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-sm text-slate-300">Detalles</span>
                    <textarea
                      value={entry.details}
                      onChange={(event) =>
                        updateEducationEntry(index, {
                          details: event.target.value,
                        })
                      }
                      rows={3}
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEducationEntries((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                  className="mt-3 text-sm text-rose-400"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Credenciales y certificados
            </h3>
            <button
              type="button"
              onClick={() =>
                setCredentialEntries((current) => [
                  ...current,
                  createCredentialEntry(),
                ])
              }
              className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-200"
            >
              + Añadir
            </button>
          </div>

          <div className="space-y-4">
            {credentialEntries.map((entry, index) => (
              <div
                key={`${index}-credential`}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
              >
                <div className="grid gap-3 md:grid-cols-3">
                  <label className="block">
                    <span className="text-sm text-slate-300">Nombre</span>
                    <input
                      value={entry.name}
                      onChange={(event) =>
                        updateCredentialEntry(index, {
                          name: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-slate-300">Entidad</span>
                    <input
                      value={entry.issuer}
                      onChange={(event) =>
                        updateCredentialEntry(index, {
                          issuer: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-slate-300">Año</span>
                    <input
                      value={entry.year}
                      onChange={(event) =>
                        updateCredentialEntry(index, {
                          year: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCredentialEntries((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                  className="mt-3 text-sm text-rose-400"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Idiomas</h3>
            <button
              type="button"
              onClick={() =>
                setLanguageEntries((current) => [
                  ...current,
                  createLanguageEntry(),
                ])
              }
              className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-200"
            >
              + Añadir
            </button>
          </div>

          <div className="space-y-4">
            {languageEntries.map((entry, index) => (
              <div
                key={`${index}-language`}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm text-slate-300">Idioma</span>
                    <input
                      value={entry.name}
                      onChange={(event) =>
                        updateLanguageEntry(index, { name: event.target.value })
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-slate-300">Nivel</span>
                    <input
                      value={entry.proficiency}
                      onChange={(event) =>
                        updateLanguageEntry(index, {
                          proficiency: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setLanguageEntries((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                  className="mt-3 text-sm text-rose-400"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-sm text-slate-300">
            Enlace del archivo descargable
          </span>
          <input
            value={fileUrl}
            onChange={(event) => setFileUrl(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          Guardar CV
        </button>
        <span className="text-sm text-slate-400">{status}</span>
      </div>
    </section>
  );
}
