import { buildExternalUrl, fetcher } from "@/lib/api";
import { Repo } from "@/types";

export interface DevToArticleFilter {
  tag?: string;
  limit?: number;
}

export async function getDevToArticles({
  tag = "javascript",
  limit = 5,
}: DevToArticleFilter) {
  try {
    const response = await fetch(
      `https://dev.to/api/articles?tag=${tag}&per_page=${limit}`,
    );
    if (!response.isOk) throw new Error(`Dev.to error: ${response.status}`);

    const data = await response.json();

    // Normalizamos la respuesta para tu componente
    return data.map((article) => ({
      title: article.title,
      url: article.url,
      description: article.description,
      image: article.cover_image || article.social_image,
      date: new Date(article.published_at).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Error cargando artículos de Dev.to:", error);
    return [];
  }
}
