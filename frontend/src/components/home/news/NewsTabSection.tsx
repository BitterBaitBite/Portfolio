"use client";

import { getDevToArticles } from "@/services/devToService";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

enum NewsTabType {
  DEV = "dev",
  CYBER = "cyber",
  GAMEDEV = "gamedev",
}

interface NewsTabProps {
  devNews?: any[];
  cyberNews?: any[];
  gameNews?: any[];
}

export default function NewsTabSection({
  devNews = [],
  cyberNews = [],
  gameNews = [],
}: any) {
  const [currentTab, setCurrentTab] = useState<NewsTabType>(NewsTabType.DEV);

  const isCurrentTab = useCallback(
    (tabType: NewsTabType): boolean => {
      return currentTab === tabType;
    },
    [currentTab],
  );

  return (
    <aside
      className={["flex flex-col gap-1", "bg-zinc-700/20", "w-1/4"].join(" ")}
    >
      <div className="flex flex-row justify-around gap-1">
        <button
          className={[
            "w-full p-4 bg-slate-700/20",
            isCurrentTab(NewsTabType.DEV) ? "bg-zinc-600/60" : "bg-zinc-700/50",
          ].join(" ")}
          onClick={() => setCurrentTab(NewsTabType.DEV)}
        >
          Dev.to
        </button>

        <button
          className={[
            "w-full p-4 bg-slate-700/20",
            isCurrentTab(NewsTabType.DEV) ? "bg-zinc-600/60" : "bg-zinc-700/50",
          ].join(" ")}
          onClick={() => setCurrentTab(NewsTabType.CYBER)}
        >
          Cyber
        </button>

        <button
          className={[
            "w-full p-4 bg-slate-700/20",
            isCurrentTab(NewsTabType.DEV) ? "bg-zinc-600/60" : "bg-zinc-700/50",
          ].join(" ")}
          onClick={() => setCurrentTab(NewsTabType.GAMEDEV)}
        >
          Gamedev
        </button>
      </div>

      <div className="">
        <section
          className={[
            "flex flex-col gap-2",
            "px-4 py-2",
            "shadow-[3px_3px_0px_0px] shadow-zinc-400/15",
            "hover:shadow-[0]",
            "bg-zinc-900/50 hover:scale-[102%]",
            "transition-all duration-700 ease-out",
            "hover:bg-gradient-to-br from-white/[0.07] via-zinc-950/50 to-zinc-950/70",
          ].join(" ")}
        >
          {devNews
            ?.filter(
              (el: any) =>
                (el.language === "en" || el.language === "es") &&
                el.url.startsWith("https://dev.to"),
            )
            .map((el: any) => (
              <article key={el.id} className="w-full">
                <Link
                  key={el.id}
                  className="flex flex-col w-full"
                  href={el.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="block">{el.title}</h3>

                  <p className="text-slate-600">{el.description}</p>

                  <span>
                    {el.user.name} | {el.user.username}
                  </span>
                </Link>
              </article>
            ))}
        </section>
      </div>
    </aside>
  );
}
