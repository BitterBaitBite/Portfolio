import Link from "next/link";

export default function ProjectsPage() {
  return (
    <section
      className={[
        "flex flex-col gap-2 sm:gap-4 md:gap-6",
        "px-4 py-2 sm:p-6 lg:p-8",
      ].join(" ")}
    >
      <h1 className="text-3xl font-semibold text-white">
        Felicidades, has saltado la madriguera de conejo
      </h1>

      <p className="">
        En ciberseguridad y desarrollo, la diferencia entre encontrar una
        vulnerabilidad o solucionar un bug crítico y quedarse frustrado en la
        superficie es, precisamente, la perseverancia. Si has llegado hasta
        aquí, significa que compartes esa misma curiosidad insaciable que me
        mueve a mí cada día. ¿Has encontrado este rincón analizando el código,
        probando rutas o fuzzing, has encontrado el easter egg de la terminal? O
        quizás has visto algo que se me ha escapado. Si has detectado alguna
        vulnerabilidad (o simplemente te gusta cómo trabajo),
        <Link href="/contact" aria-label="Contact">
          ¡no dudes en ponerte en contacto conmigo!
        </Link>
      </p>
    </section>
  );
}
