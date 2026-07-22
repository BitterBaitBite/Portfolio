import { API_BASE_URL } from "@/config/api";
import { NewsArticle, RSS2JsonResponse } from "@/types";

export function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | string[]>,
) {
  const url = new URL(
    path.startsWith("/") ? `${API_BASE_URL}${path}` : `${API_BASE_URL}/${path}`,
  );

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((item) => url.searchParams.append(key, String(item)));
        return;
      }
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

export function buildExternalUrl(
  path: string,
  params?: Record<string, string | number | boolean | string[]>,
) {
  const url = new URL(
    path.startsWith("https://") ? path : `${API_BASE_URL}/404`,
  );

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((item) => url.searchParams.append(key, String(item)));
        return;
      }
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} - ${errorBody}`,
    );
  }

  return response.json();
}

export async function getTechnicalFeed(rssUrl: string): Promise<NewsArticle[]> {
  try {
    const encodedUrl = encodeURIComponent(rssUrl);
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodedUrl}`,
    );

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data: RSS2JsonResponse = await response.json();
    return data.items.map<NewsArticle>((item) => ({
      id: item.guid,
      title: item.title,
      description:
        item.description.replace(/<[^>]*>/g, "").substring(0, 90) + "...",
      url: item.link,
      name: item.author,
      image: item.thumbnail || item.enclosure?.link || null,
      date: new Date(item.pubDate).toLocaleDateString(),
    }));
  } catch (error) {
    console.error(`Source: ${rssUrl}.\nError obtaining RSS data\n`, error);
    return [];
  }
}
