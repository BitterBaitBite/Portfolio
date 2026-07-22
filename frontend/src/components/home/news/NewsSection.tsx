"use client";

import { DevToArticle, NewsArticle } from "@/types";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import TabButton from "./TabButton";
import Image from "next/image";

enum NewsTabType {
  DEV = "dev",
  CYBER = "cyber",
  GAMEDEV = "gamedev",
}

interface NewsSectionProps {
  devNews?: DevToArticle[];
  cyberNews?: any[];
  gameNews?: any[];
}

function mapDevToArticle(dto: DevToArticle): NewsArticle {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    url: dto.url,
    name: dto.user.name,
    username: dto.user.username,
    image: dto.cover_image,
    date: new Date(dto.published_at).toLocaleDateString(),
  };
}

export default function NewsSection({
  devNews = [],
  cyberNews = [],
  gameNews = [],
}: NewsSectionProps) {
  const [currentTab, setCurrentTab] = useState<NewsTabType>(NewsTabType.DEV);

  const isCurrentTab = useCallback(
    (tabType: NewsTabType): boolean => {
      return currentTab === tabType;
    },
    [currentTab],
  );

  const newsArticles: NewsArticle[] = useMemo(() => {
    switch (currentTab) {
      case NewsTabType.DEV:
        // Filter by language and map to default Article type and format
        return devNews
          .filter(
            (el: DevToArticle) =>
              (el.language === "en" || el.language === "es") &&
              el.url.startsWith("https://dev.to"),
          )
          .map(mapDevToArticle);
      case NewsTabType.CYBER:
        return cyberNews.slice(0, 5);
      case NewsTabType.GAMEDEV:
        return gameNews.slice(0, 5);
      default:
        return [];
    }
  }, [devNews, cyberNews, gameNews, currentTab]);

  return (
    <aside
      className={[
        "flex flex-col",
        "w-1/4",
        "shadow-[3px_3px_0px_0px] shadow-zinc-400/15",
        "hover:shadow-[0]",
        "bg-zinc-900/50 hover:scale-[102%]",
        "transition-all duration-700 ease-out",
        "hover:bg-gradient-to-br from-white/[0.07] via-zinc-950/50 to-zinc-950/70",
      ].join(" ")}
    >
      <div className="flex flex-row justify-around">
        <TabButton
          label={NewsTabType.DEV}
          isActive={isCurrentTab(NewsTabType.DEV)}
          onClick={() => setCurrentTab(NewsTabType.DEV)}
        />

        <TabButton
          label={NewsTabType.CYBER}
          isActive={isCurrentTab(NewsTabType.CYBER)}
          onClick={() => setCurrentTab(NewsTabType.CYBER)}
        />

        <TabButton
          label={NewsTabType.GAMEDEV}
          isActive={isCurrentTab(NewsTabType.GAMEDEV)}
          onClick={() => setCurrentTab(NewsTabType.GAMEDEV)}
        />
      </div>

      <div className={["flex flex-col"].join(" ")}>
        {newsArticles &&
          newsArticles.map((el: NewsArticle) => (
            <article
              key={el.id}
              className={[
                "w-full group px-4 py-3 hover:bg-slate-600/30",
                "transition-all duration-300 ease-in-out",
              ].join(" ")}
            >
              <Link
                key={el.id}
                className="flex flex-col gap-1 w-full"
                href={el.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Thumbnail not consistent enough (not every article has an image, or it is not suitable) */}
                {/* {el.image && (
                  <picture className="w-full h-28 relative hidden group-hover:block">
                    <Image
                      alt={el.title}
                      src={el.image}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </picture>
                )} */}

                <h3 className="line-clamp-1 text-[14px] leading-5">
                  {el.title}
                </h3>

                <p className="line-clamp-3 text-slate-500">{el.description}</p>

                <span className="text-[10px] text-slate-700 uppercase self-end">
                  {el.name}
                </span>
              </Link>
            </article>
          ))}
      </div>
    </aside>
  );
}
