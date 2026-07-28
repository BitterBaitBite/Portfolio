import DynamicLinkButton from "@/components/common/DynamicLinkButton";
import GithubRepoCard from "@/components/github/GithubRepoCard";
import NewsSection from "@/components/home/news/NewsSection";
import SectionCard from "@/components/home/SectionCard";
import InternalLinkIcon from "@/components/svg/InternalLinkIcon";
import {
  getBleepingArticles,
  getBleepingArticlesAPI,
} from "@/services/bleepingComputerService";
import { ArticleState, getDevToArticles } from "@/services/devToService";
import { getEightyLevelArticles } from "@/services/eightyLevelService";
import { getGameDeveloperArticles } from "@/services/gameDeveloperService";
import { getRepos } from "@/services/githubService";
import { Repo } from "@/types";

export default async function HomePage() {
  const repos = await getRepos({ per_page: "5", sort: "updated" });
  const devToArticles = await getDevToArticles({
    tag: "webdev",
    per_page: 5,
    top: 15,
    state: ArticleState.RISING,
  });

  let bleepingArticles = await getBleepingArticles();
  if (bleepingArticles.length === 0)
    bleepingArticles = await getBleepingArticlesAPI();

  const gameDeveloperArticles = await getGameDeveloperArticles();
  const eightyLevelArticles = await getEightyLevelArticles();

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

          <p className="text-slate-500 text-sm mb-2">
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

          <p className="text-slate-500 text-sm mb-2">
            Take a look at some of my recent projects. You can filter them by
            title, subtitle, and tags to find what interests you the most.
          </p>

          <DynamicLinkButton
            href="/projects"
            text={"About me"}
            icon={InternalLinkIcon}
          />
        </SectionCard>

        <SectionCard>
          <h2 className="text-xl text-slate-300 uppercase tracking-wider">
            CV
          </h2>

          <p className="text-slate-500 text-sm mb-2">
            Here you can see my work experience and education feats, as well as
            some certifications. You can download a PDF version from here too,
            in case you want to show it around.
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

      {/* NEWS */}
      <NewsSection
        devNews={devToArticles}
        cyberNews={bleepingArticles}
        gameNews={gameDeveloperArticles}
      />
    </div>
  );
}
