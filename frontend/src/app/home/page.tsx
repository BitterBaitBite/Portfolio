import DynamicLinkButton from "@/components/common/DynamicLinkButton";
import GithubRepoCard from "@/components/github/GithubRepoCard";
import SectionCard from "@/components/home/SectionCard";
import GithubIcon from "@/components/svg/GithubIcon";
import InternalLinkIcon from "@/components/svg/InternalLinkIcon";
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
      <div className="flex flex-col gap-4 flex-1 md:flex-1/2">
        {/* PROJECTS */}
        <SectionCard>
          <h2 className="text-xl font-semibold text-slate-300 uppercase tracking-wider">
            Projects
          </h2>

          <p className="text-slate-300 text-sm">
            Take a look at some of my recent projects. You can filter them by
            title, subtitle, and tags to find what interests you the most.
          </p>

          <DynamicLinkButton
            href="/projects"
            text={"View All Projects"}
            icon={InternalLinkIcon}
          />
        </SectionCard>

        {/* ABOUT */}
        <SectionCard>
          <h2 className="text-xl text-slate-300 uppercase tracking-wider">
            About<span className="text-cyan-500 font-bold"> Me</span>
          </h2>

          <p className="text-slate-500 text-sm">
            Take a look at some of my recent projects. You can filter them by
            title, subtitle, and tags to find what interests you the most.
          </p>

          <DynamicLinkButton
            href="/projects"
            text={"About me"}
            icon={InternalLinkIcon}
          />
        </SectionCard>
      </div>

      {/* GITHUB */}
      <SectionCard>
        <h2 className="text-xl font-semibold text-slate-300 uppercase tracking-wider">
          Github
        </h2>

        <ul className="flex flex-col gap-2">
          {repos?.map((repo: Repo) => (
            <GithubRepoCard key={repo.id} {...repo} />
          ))}
        </ul>
      </SectionCard>
    </section>
  );
}
