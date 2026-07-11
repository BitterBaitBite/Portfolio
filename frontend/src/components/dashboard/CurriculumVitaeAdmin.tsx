"use client";

import { useEffect, useState } from "react";
import { CurriculumVitae } from "@/types";
import { upsertCurriculumVitae } from "@/services/adminService";

interface CurriculumVitaeAdminProps {
  token: string;
  curriculumVitae: CurriculumVitae | null;
  onRefresh: () => void;
}

export function CurriculumVitaeAdmin({
  token,
  curriculumVitae,
  onRefresh,
}: CurriculumVitaeAdminProps) {
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [credentials, setCredentials] = useState("");
  const [languages, setLanguages] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (curriculumVitae) {
      setSummary(curriculumVitae.summary ?? "");
      setExperience(curriculumVitae.experience?.join("\n") ?? "");
      setEducation(curriculumVitae.education?.join("\n") ?? "");
      setCredentials(curriculumVitae.credentials?.join("\n") ?? "");
      setLanguages(curriculumVitae.languages?.join("\n") ?? "");
      setFileUrl(curriculumVitae.fileUrl ?? "");
    }
  }, [curriculumVitae]);

  async function handleSave() {
    try {
      setStatus("Guardando currículum...");
      await upsertCurriculumVitae(token, {
        id: curriculumVitae?.id,
        summary,
        experience: experience.split("\n").map((item) => item.trim()).filter(Boolean),
        education: education.split("\n").map((item) => item.trim()).filter(Boolean),
        credentials: credentials.split("\n").map((item) => item.trim()).filter(Boolean),
        languages: languages.split("\n").map((item) => item.trim()).filter(Boolean),
        fileUrl,
      });
      setStatus("Currículum actualizado correctamente.");
      onRefresh();
    } catch (error) {
      setStatus(`Error al actualizar currículum: ${error}`);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">Currículum Vitae</h2>
        <p className="mt-2 text-slate-400">
          Gestiona la información pública del CV y su archivo descargable.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-slate-300">Resumen</span>
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm text-slate-300">Experiencia laboral (una por línea)</span>
          <textarea
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm text-slate-300">Educación (una por línea)</span>
          <textarea
            value={education}
            onChange={(event) => setEducation(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm text-slate-300">Credenciales y certificados (uno por línea)</span>
          <textarea
            value={credentials}
            onChange={(event) => setCredentials(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm text-slate-300">Idiomas (uno por línea)</span>
          <textarea
            value={languages}
            onChange={(event) => setLanguages(event.target.value)}
            rows={3}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm text-slate-300">Enlace del archivo descargable</span>
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
