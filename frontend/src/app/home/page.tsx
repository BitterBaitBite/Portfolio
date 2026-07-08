import GithubIcon from "@/components/svg/GithubIcon";
import { getRepos } from "@/services/githubService";
import { Repo } from "@/types";
import Link from "next/dist/client/link";

export default async function HomePage() {
  const repos = await getRepos({ per_page: "5", sort: "updated" });

  return (
    <section
      className={[
        "flex flex-col gap-2 sm:gap-4 md:flex-row md:gap-6",
        "px-4 py-2 sm:p-6 lg:p-8",
      ].join(" ")}
    >
      <div
        className={[
          "flex flex-col gap-2 flex-1",
          "md:flex-1/2",
          "rounded-sm border border-slate-700 bg-slate-950/20",
          "px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-4",
        ].join(" ")}
      >
        <h2 className="text-2xl font-semibold text-slate-300">Projects</h2>

        <p className="text-slate-300 text-sm">
          Take a look at some of my recent projects. You can filter them by
          title, subtitle, and tags to find what interests you the most.
        </p>

        <Link
          href="/projects"
          className="mt-2 inline-block rounded-sm bg-blue-500 px-4 py-2 text-slate-300 hover:bg-blue-600"
        >
          View All Projects
        </Link>
      </div>

      <div
        className={[
          "flex flex-col gap-4 flex-1",
          "md:flex-1/2",
          "rounded-sm border border-slate-700 bg-slate-950/20 p-4",
        ].join(" ")}
      >
        <h2 className="text-2xl font-semibold text-slate-300">Github</h2>

        <ul className="flex flex-col gap-2">
          {repos?.map((repo: Repo) => (
            <li
              key={repo.id}
              className={[
                "flex flex-col gap-2",
                "bg-slate-800/20 p-4 rounded-sm",
              ].join(" ")}
            >
              <h3 className="text-lg">{repo.name}</h3>

              {repo.description && (
                <p className="text-gray-600 text-sm">{repo.description}</p>
              )}

              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {repo.topics.map((topic: string) => (
                    <span
                      key={topic}
                      className="bg-blue-500/20 text-blue-500 px-2 py-1 rounded text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex justify-between gap-2">
                <Link
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center gap-2 text-slate-300 hover:underline"
                >
                  <div className="text-sm text-gray-500 flex items-center">
                    <GithubIcon className="inline-block w-4 h-4" />
                  </div>

                  <span className="text-sm">Ver en GitHub</span>
                </Link>

                <span className="text-xs font-bold text-slate-900 py-1 px-3 bg-amber-500 rounded-full">
                  {repo.language}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
