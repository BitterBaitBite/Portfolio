"use client";

import { useEffect, useState } from "react";
import { getAbout } from "@/services/projectService";
import { About } from "@/types";

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAbout()
      .then(setAbout)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section
      className={[
        "flex flex-col gap-2 sm:gap-4 md:gap-6",
        "px-4 py-2 sm:p-6 lg:p-8",
      ].join(" ")}
    >
      <h1 className="text-3xl font-semibold text-slate-300">About Me</h1>

      {isLoading ? (
        <p className="mt-4 text-slate-300">Cargando contenido...</p>
      ) : error ? (
        <p className="mt-4 text-red-400">{error}</p>
      ) : about ? (
        <div className="mt-6 space-y-4 text-slate-300">
          <h2 className="text-2xl font-semibold text-slate-300">
            {about.title}
          </h2>

          {about.subtitle ? (
            <p className="text-slate-400">{about.subtitle}</p>
          ) : null}

          <p className="leading-7">{about.body}</p>
        </div>
      ) : (
        <p className="mt-4 text-slate-300">No hay información disponible.</p>
      )}
    </section>
  );
}
