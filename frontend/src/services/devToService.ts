import { buildExternalUrl, fetcher } from "@/lib/api";
import { DevToArticle as Article } from "@/types";

enum ArticleState {
  "fresh" = "fresh",
  "rising" = "rising",
  "all" = "all",
}

export interface ArticleFilter {
  page?: number;
  per_page?: number;
  tag?: string;
  tags?: string;
  tags_exclude?: string;
  username?: string;
  state?: ArticleState;
  top?: number;
  collection_id?: number;
}

export async function getDevToArticles(
  filter: ArticleFilter = {},
): Promise<Article[]> {
  const baseUrl = "https://dev.to/api/articles";
  const query: Record<string, string | number> = {};

  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined) {
      query[key] = value;
    }
  });

  const url = buildExternalUrl(baseUrl, query);
  return fetcher<Article[]>(url, { next: { revalidate: 86400 } });
}
