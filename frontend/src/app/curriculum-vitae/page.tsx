import { getCurriculumVitae } from "@/services/projectService";

export default async function CurriculumVitaePage() {
  const curriculum = await getCurriculumVitae().catch(() => null);

  return (
    <section
      className={[
        "flex flex-col gap-2 sm:gap-4 md:gap-6",
        "px-4 py-2 sm:p-6 lg:p-8",
      ].join(" ")}
    >
      <h1 className="text-3xl font-semibold text-white">Currículum Vitae</h1>

      <div className="max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow text-slate-300">
        {curriculum ? (
          <div className="space-y-6">
            {curriculum.summary ? (
              <div>
                <h2 className="text-xl font-semibold text-white">Resumen</h2>
                <p className="mt-2 whitespace-pre-line">{curriculum.summary}</p>
              </div>
            ) : null}

            {curriculum.experience?.length ? (
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Experiencia laboral
                </h2>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  {curriculum.experience.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {curriculum.education?.length ? (
              <div>
                <h2 className="text-xl font-semibold text-white">Educación</h2>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  {curriculum.education.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {curriculum.credentials?.length ? (
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Credenciales y certificados
                </h2>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  {curriculum.credentials.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {curriculum.languages?.length ? (
              <div>
                <h2 className="text-xl font-semibold text-white">Idiomas</h2>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  {curriculum.languages.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {curriculum.fileUrl ? (
              <div>
                <a
                  href={curriculum.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  Descargar CV
                </a>
              </div>
            ) : null}
          </div>
        ) : (
          <p>No hay información de curriculum disponible todavía.</p>
        )}
      </div>
    </section>
  );
}
