import { getRssFeed, getTechnicalFeed } from "@/lib/rss";
import { NewsArticle } from "@/types";

export async function getBleepingArticles(): Promise<NewsArticle[]> {
  return getRssFeed("https://www.bleepingcomputer.com/feed/");
}
