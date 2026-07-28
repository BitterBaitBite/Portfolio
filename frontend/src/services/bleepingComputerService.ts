import { getRssFeed, getRssFeedAPI } from "@/lib/rss";
import { NewsArticle } from "@/types";

export async function getBleepingArticles(): Promise<NewsArticle[]> {
  return getRssFeed("https://www.bleepingcomputer.com/feed/");
}

export async function getBleepingArticlesAPI(): Promise<NewsArticle[]> {
  return getRssFeedAPI("https://www.bleepingcomputer.com/feed/");
}
