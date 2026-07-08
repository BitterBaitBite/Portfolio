import { Project } from "@/types";
import { useRouter } from "next/dist/client/components/navigation";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  return (
    <article
      onClick={() => router.push(`/projects/${project.id}`)}
      className={[
        "group overflow-hidden",
        "rounded-sm border border-slate-800 bg-slate-900/20 p-6",
        "transition hover:-translate-y-1 hover:border-slate-600 hover:cursor-pointer",
      ].join(" ")}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">{project.title}</h2>
          {project.subtitle ? (
            <p className="text-sm text-slate-400">{project.subtitle}</p>
          ) : null}
        </div>
      </div>

      <p className="text-slate-300">{project.brief}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag.id}
            className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-widest text-slate-300"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </article>
  );
}
