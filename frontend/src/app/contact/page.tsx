import { getContact } from "@/services/projectService";

export default async function ContactPage() {
  const contact = await getContact().catch(() => null);

  return (
    <section
      className={[
        "flex flex-col gap-2 sm:gap-4 md:gap-6",
        "px-4 py-2 sm:p-6 lg:p-8",
      ].join(" ")}
    >
      <h1 className="text-3xl font-semibold text-white">Contacto</h1>

      <div className="max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow text-slate-300">
        {contact ? (
          <div className="space-y-3">
            {contact.email ? (
              <p>
                <span className="font-semibold text-white">Email:</span>{" "}
                {contact.email}
              </p>
            ) : null}
            {contact.phone ? (
              <p>
                <span className="font-semibold text-white">Teléfono:</span>{" "}
                {contact.phone}
              </p>
            ) : null}
            {contact.linkedin ? (
              <p>
                <span className="font-semibold text-white">LinkedIn:</span>{" "}
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  {contact.linkedin}
                </a>
              </p>
            ) : null}
            {contact.github ? (
              <p>
                <span className="font-semibold text-white">GitHub:</span>{" "}
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  {contact.github}
                </a>
              </p>
            ) : null}
          </div>
        ) : (
          <p>No hay información de contacto disponible todavía.</p>
        )}
      </div>
    </section>
  );
}
