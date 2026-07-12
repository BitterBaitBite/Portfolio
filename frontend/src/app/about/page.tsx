"use client";

import { useEffect, useState } from "react";
import { getAbout } from "@/services/projectService";
import { About } from "@/types";
import { parseAboutSections } from "@/utils/aboutContent";

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

  const sections = parseAboutSections(about?.body);

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
        <div className="mt-6 space-y-6 text-slate-300">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-300">
              {about.title}
            </h2>

            {about.subtitle ? (
              <p className="text-slate-400">{about.subtitle}</p>
            ) : null}
          </div>

          {sections.length ? (
            <div className="space-y-4">
              {sections.map((section, index) => {
                const isRightAligned = section.alignment === "right";

                return (
                  <div
                    key={`${section.title || "section"}-${index}`}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
                  >
                    <div
                      className={`flex flex-col gap-4 ${
                        section.imageUrl ? "md:flex-row" : ""
                      } ${section.imageUrl && isRightAligned ? "md:flex-row-reverse" : ""}`}
                    >
                      {section.imageUrl ? (
                        <img
                          src={section.imageUrl}
                          alt={section.title || "Imagen del bloque About"}
                          className="h-56 w-full rounded-2xl object-cover md:w-2/5"
                        />
                      ) : null}

                      <div className="flex-1">
                        {section.title ? (
                          <h3 className="text-lg font-semibold text-slate-100">
                            {section.title}
                          </h3>
                        ) : null}
                        <p className="mt-2 leading-7 whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : about.body ? (
            <p className="leading-7 whitespace-pre-line">{about.body}</p>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 text-slate-300">No hay información disponible.</p>
      )}
    </section>
  );
}
