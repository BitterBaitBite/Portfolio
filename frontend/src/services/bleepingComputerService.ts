import { buildExternalUrl, fetcher, getTechnicalFeed } from "@/lib/api";
import { NewsArticle } from "@/types";

export async function getBleepingArticles(): Promise<NewsArticle[]> {
  return getTechnicalFeed("https://www.bleepingcomputer.com/feed/");
}
