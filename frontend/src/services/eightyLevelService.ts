import { getTechnicalFeed } from "@/lib/api";
import { NewsArticle } from "@/types";

export async function getEightyLevelArticles(): Promise<NewsArticle[]> {
  return getTechnicalFeed("https://80.lv/feed");
}
