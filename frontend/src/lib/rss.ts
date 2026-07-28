import Parser from "rss-parser";
import { NewsArticle, RSS2JsonResponse } from "@/types";
import {
  extract,
  FeedData,
  FeedEntry,
  FetchOptions,
} from "@extractus/feed-extractor";

type NextFetchOptions = FetchOptions & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

type ExtraFieldsEntry = FeedEntry & {
  author: string | null;
  thumbnail: string | null;
  "dc:creator": string | null;
  content: string | null;
};

export async function getRssFeed(rssUrl: string): Promise<NewsArticle[]> {
  try {
    const fetchOptions: NextFetchOptions = {
      next: { revalidate: 86400 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
    };

    const feed = await extract(
      rssUrl,
      {
        normalization: true,
        getExtraEntryFields: (feedEntry) => ({
          author: feedEntry.author,
          thumbnail: feedEntry.thumbnail,
          "dc:creator": feedEntry["dc:creator"],
          content: feedEntry.content,
        }),
      },
      fetchOptions,
    );

    if (!feed || !Array.isArray(feed.entries)) {
      return [];
    }

    return feed.entries.map<NewsArticle>((entry) => {
      const completeEntry = entry as ExtraFieldsEntry;

      const rawDescription = completeEntry.description || "";
      const cleanDescription =
        rawDescription
          .replace(/<[^>]*>/g, "")
          .substring(0, 90)
          .trim() + "...";

      const formattedDate = completeEntry.published
        ? new Date(completeEntry.published).toLocaleDateString()
        : new Date().toLocaleDateString();

      return {
        id: completeEntry.id || completeEntry.link || Math.random().toString(),
        title: completeEntry.title || "",
        description: cleanDescription,
        url: completeEntry.link || "#",
        name: completeEntry.author || completeEntry["dc:creator"] || "",
        image: completeEntry.thumbnail || null,
        date: formattedDate,
      };
    });
  } catch (error) {
    console.error(`Source: ${rssUrl}.\nError obtaining RSS data\n`, error);
    return [];
  }
}

export async function getRssFeedAPI(rssUrl: string): Promise<NewsArticle[]> {
  try {
    const encodedUrl = encodeURIComponent(rssUrl);
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodedUrl}`,
      {
        next: { revalidate: 86400 },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        },
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `API request failed: ${response.status} ${response.statusText} - ${errorBody}`,
      );
    }

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
