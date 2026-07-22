import { buildExternalUrl, fetcher, getTechnicalFeed } from "@/lib/api";
import { NewsArticle } from "@/types";

export async function getGameDeveloperArticles(): Promise<NewsArticle[]> {
  return getTechnicalFeed("https://www.gamedeveloper.com/rss.xml");
}
