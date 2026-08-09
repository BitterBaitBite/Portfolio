import { buildUrl, fetcher } from "@/lib/api";
import {
  getRssFeed,
  getRssFeedAPI,
  getRssParserFeed,
  getRssFeedGoogle,
} from "@/lib/rss";
import { NewsArticle } from "@/types";

export async function getBleepingArticles(): Promise<NewsArticle[]> {
  return getRssFeed("https://www.bleepingcomputer.com/feed/");
}

export async function getBleepingArticlesAPI(): Promise<NewsArticle[]> {
  return getRssFeedAPI("/news/bleeping-computer");
}

export async function getBleepingArticlesParser(): Promise<NewsArticle[]> {
  return getRssParserFeed("https://www.bleepingcomputer.com/feed/");
}

export async function getBleepingArticlesGoogle(): Promise<NewsArticle[]> {
  return getRssFeedGoogle("https://www.bleepingcomputer.com/feed/");
}
