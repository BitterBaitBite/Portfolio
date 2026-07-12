import { getCurriculumVitae } from "@/services/projectService";

type ExperienceEntry = {
  role?: string;
  organization?: string;
  period?: string;
  description?: string;
};

type EducationEntry = {
  degree?: string;
  institution?: string;
  period?: string;
  details?: string;
};

type CredentialEntry = {
  name?: string;
  issuer?: string;
  year?: string;
};

type LanguageEntry = {
  name?: string;
  proficiency?: string;
};

function parseStructuredItem<T>(value: string) {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function renderText(value?: string) {
  return value?.trim() ? value : null;
}

export default async function CurriculumVitaePage() {
  const curriculum = await getCurriculumVitae().catch(() => null);

  const experienceItems = (curriculum?.experience ?? []).map(
    (item) => parseStructuredItem<ExperienceEntry>(item) ?? { role: item },
  );
  const educationItems = (curriculum?.education ?? []).map(
    (item) => parseStructuredItem<EducationEntry>(item) ?? { degree: item },
  );
  const credentialItems = (curriculum?.credentials ?? []).map(
    (item) => parseStructuredItem<CredentialEntry>(item) ?? { name: item },
  );
  const languageItems = (curriculum?.languages ?? []).map(
    (item) => parseStructuredItem<LanguageEntry>(item) ?? { name: item },
  );

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

            {experienceItems.length ? (
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Experiencia laboral
                </h2>
                <div className="mt-3 space-y-3">
                  {experienceItems.map((item, index) => (
                    <div
                      key={`${item.role ?? "experience"}-${index}`}
                      className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
                    >
                      {renderText(item.role) ? (
                        <p className="font-semibold text-white">{item.role}</p>
                      ) : null}
                      {renderText(item.organization) ? (
                        <p className="mt-1 text-sm text-sky-400">
                          {item.organization}
                        </p>
                      ) : null}
                      {renderText(item.period) ? (
                        <p className="mt-1 text-sm text-slate-400">
                          {item.period}
                        </p>
                      ) : null}
                      {renderText(item.description) ? (
                        <p className="mt-2 whitespace-pre-line">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {educationItems.length ? (
              <div>
                <h2 className="text-xl font-semibold text-white">Educación</h2>
                <div className="mt-3 space-y-3">
                  {educationItems.map((item, index) => (
                    <div
                      key={`${item.degree ?? "education"}-${index}`}
                      className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
                    >
                      {renderText(item.degree) ? (
                        <p className="font-semibold text-white">
                          {item.degree}
                        </p>
                      ) : null}
                      {renderText(item.institution) ? (
                        <p className="mt-1 text-sm text-sky-400">
                          {item.institution}
                        </p>
                      ) : null}
                      {renderText(item.period) ? (
                        <p className="mt-1 text-sm text-slate-400">
                          {item.period}
                        </p>
                      ) : null}
                      {renderText(item.details) ? (
                        <p className="mt-2 whitespace-pre-line">
                          {item.details}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {credentialItems.length ? (
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Credenciales y certificados
                </h2>
                <div className="mt-3 space-y-3">
                  {credentialItems.map((item, index) => (
                    <div
                      key={`${item.name ?? "credential"}-${index}`}
                      className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
                    >
                      {renderText(item.name) ? (
                        <p className="font-semibold text-white">{item.name}</p>
                      ) : null}
                      {renderText(item.issuer) ? (
                        <p className="mt-1 text-sm text-sky-400">
                          {item.issuer}
                        </p>
                      ) : null}
                      {renderText(item.year) ? (
                        <p className="mt-1 text-sm text-slate-400">
                          {item.year}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {languageItems.length ? (
              <div>
                <h2 className="text-xl font-semibold text-white">Idiomas</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {languageItems.map((item, index) => (
                    <span
                      key={`${item.name ?? "language"}-${index}`}
                      className="rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
                    >
                      {renderText(item.name) ?? "Idioma"}
                      {renderText(item.proficiency)
                        ? ` · ${item.proficiency}`
                        : ""}
                    </span>
                  ))}
                </div>
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
