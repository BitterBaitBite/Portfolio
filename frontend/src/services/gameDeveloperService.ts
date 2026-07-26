import { getRssFeed, getTechnicalFeed } from "@/lib/rss";
import { NewsArticle } from "@/types";

export async function getGameDeveloperArticles(): Promise<NewsArticle[]> {
  return getRssFeed("https://www.gamedeveloper.com/rss.xml");
}
