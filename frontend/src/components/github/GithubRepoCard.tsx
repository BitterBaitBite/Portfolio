import Link from "next/link";
import GithubIcon from "../svg/GithubIcon";
import { Repo } from "@/types";
import DynamicLinkButton from "../common/DynamicLinkButton";

export default function GithubRepoCard({
  id,
  name,
  description,
  topics,
  html_url,
  language,
}: Repo) {
  return (
    <li
      key={id}
      className={[
        "flex flex-col gap-3",
        "bg-zinc-700/20 py-3 px-4 rounded-sm",
        "hover:bg-zinc-600/20",
        "transition-all duration-300 ease-in-out",
      ].join(" ")}
    >
      <h3 className="text-base tracking-wider text-slate-300 leading-none">
        {name}
      </h3>

      {description && <p className="text-slate-500 text-sm">{description}</p>}

      {topics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {topics.map((topic: string) => (
            <span
              key={topic}
              className="bg-amber-500/80 text-zinc-900 px-3 py-0.5 rounded-full text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <hr className="border-slate-700 mt-1.5" />

      <div className="flex justify-between items-center mt-1">
        <span className="text-sm font-bold py-1 px-3 bg-green-600 text-zinc-900 rounded-sm">
          {language}
        </span>

        <DynamicLinkButton
          href={html_url}
          text={"Ver en GitHub"}
          icon={GithubIcon}
          external
        />
      </div>
    </li>
  );
}
