import { getRssFeed, getTechnicalFeed } from "@/lib/rss";
import { NewsArticle } from "@/types";

export async function getEightyLevelArticles(): Promise<NewsArticle[]> {
  return getRssFeed("https://80.lv/feed");
}
