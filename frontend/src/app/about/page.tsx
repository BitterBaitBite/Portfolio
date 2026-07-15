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
      {isLoading ? (
        <p className="text-slate-300">Cargando contenido...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : about ? (
        <div className="text-slate-300 flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-slate-300">
            {about.title}
          </h1>

          {about.subtitle ? (
            <p className="text-slate-400">{about.subtitle}</p>
          ) : null}

          {sections.length ? (
            <div className="flex flex-col gap-6">
              {sections.map((section, index) => {
                const isRightAligned = section.alignment === "right";

                return (
                  <div
                    key={`${section.title || "section"}-${index}`}
                    className={[
                      "p-8 bg-zinc-900/5 hover:scale-[102%]",
                      "transition-all duration-700 ease-out",
                      "hover:bg-gradient-to-br from-white/[0.07] via-zinc-950/40 to-zinc-950/60",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "flex flex-col gap-6",
                        "relative z-10",
                        section.imageUrl ? "md:flex-row" : "",
                        section.imageUrl && isRightAligned
                          ? "md:flex-row-reverse"
                          : "",
                      ].join(" ")}
                    >
                      {section.imageUrl ? (
                        <img
                          src={section.imageUrl}
                          alt={section.title || "Imagen del bloque About"}
                          className="h-56 w-full rounded-md object-cover md:w-2/5"
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
