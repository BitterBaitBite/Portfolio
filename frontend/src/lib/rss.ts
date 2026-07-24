import Parser from "rss-parser";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  name: string;
  image: string | null;
  date: string;
}

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "mediaContent"],
      ["enclosure", "enclosure"],
    ],
  },
});

export async function getTechnicalFeed(rssUrl: string): Promise<NewsArticle[]> {
  try {
    // 1. Petición HTTP usando la caché nativa de Next.js
    // Revalida el feed cada 1 hora (3600 segundos) para no saturar la fuente
    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status} ${response.statusText}`,
      );
    }

    // 2. Obtener el XML puro en texto
    const xmlText = await response.text();

    // 3. Parsear el XML a JSON en el servidor
    const feed = await parser.parseString(xmlText);

    // 4. Mapear los artículos al tipo de datos exacto de tu aplicación
    return (feed.items || []).map<NewsArticle>((item) => {
      // Extraer descripción limpia sin etiquetas HTML
      const rawDescription =
        item.contentSnippet || item.content || item.summary || "";
      const cleanDescription =
        rawDescription.replace(/<[^>]*>/g, "").substring(0, 90) + "...";
      // Extraer imagen si existe en enclosure o mediaContent
      const mediaUrl =
        item.enclosure?.url ||
        (item as Record<string, any>).mediaContent?.$.url ||
        null;
      return {
        id: item.guid || item.link || Math.random().toString(),
        title: item.title || "Sin título",
        description: cleanDescription,
        url: item.link || "#",
        name: item.creator || item["dc:creator"] || "Redacción",
        image: mediaUrl,
        date: item.pubDate
          ? new Date(item.pubDate).toLocaleDateString()
          : new Date().toLocaleDateString(),
      };
    });
  } catch (error) {
    console.error(`Source: ${rssUrl}.\nError obtaining RSS data:\n`, error);
    return [];
  }
}
