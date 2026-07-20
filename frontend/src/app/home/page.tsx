import DynamicLinkButton from "@/components/common/DynamicLinkButton";
import GithubRepoCard from "@/components/github/GithubRepoCard";
import NewsSection, {
  TabItem as NewsItem,
} from "@/components/home/news/NewsSection";
import NewsTabSection from "@/components/home/news/NewsTabSection";
import SectionCard from "@/components/home/SectionCard";
import GithubIcon from "@/components/svg/GithubIcon";
import InternalLinkIcon from "@/components/svg/InternalLinkIcon";
import { getDevToArticles } from "@/services/devToService";
import { getRepos } from "@/services/githubService";
import { Repo } from "@/types";
import { render } from "@testing-library/react";
import Link from "next/link";

export default async function HomePage() {
  const repos = await getRepos({ per_page: "5", sort: "updated" });
  const devToArticles = await getDevToArticles({
    tags: "development,web",
    per_page: 5,
    top: 5,
  });

  return (
    <div
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

      {/* <section
        className={[
          "flex flex-col gap-2",
          "w-1/4 p-4",
          "shadow-[3px_3px_0px_0px] shadow-zinc-400/15",
          "hover:shadow-[0]",
          "bg-zinc-900/50 hover:scale-[102%]",
          "transition-all duration-700 ease-out",
          "hover:bg-gradient-to-br from-white/[0.07] via-zinc-950/50 to-zinc-950/70",
        ].join(" ")}
      >
        <h2 className="text-xl font-semibold text-slate-300 uppercase tracking-wider">
          News
        </h2>

        <div className="flex flex-col gap-4">
          {devToArticles
            ?.filter(
              (article) =>
                (article.language === "en" || article.language === "es") &&
                article.url.startsWith("https://dev.to"),
            )
            .map((article) => (
              <Link
                key={article.id}
                className="flex flex-col"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="block">{article.title}</h3>

                <p className="text-slate-600">{article.description}</p>

                <span>
                  {article.user.name} | {article.user.username}
                </span>
              </Link>
            ))}
        </div>
      </section> */}

      <NewsTabSection devNews={devToArticles} />
    </div>
  );
}
