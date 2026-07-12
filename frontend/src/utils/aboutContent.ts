export type AboutSectionAlignment = "left" | "right";

export interface AboutSection {
  title: string;
  content: string;
  imageUrl?: string;
  alignment?: AboutSectionAlignment;
}

function normalizeAlignment(
  value?: string | null,
): AboutSectionAlignment | undefined {
  return value === "right" ? "right" : "left";
}

export function parseAboutSections(body?: string | null): AboutSection[] {
  if (!body?.trim()) {
    return [];
  }

  const text = body.trim();

  try {
    const parsed = JSON.parse(text);

    if (Array.isArray(parsed)) {
      return parsed
        .filter(
          (item): item is Record<string, unknown> =>
            Boolean(item) && typeof item === "object",
        )
        .map((item) => ({
          title: String(item.title ?? "").trim(),
          content: String(item.content ?? item.text ?? "").trim(),
          imageUrl: String(item.imageUrl ?? item.image ?? "").trim(),
          alignment: normalizeAlignment(
            String(item.alignment ?? "").trim() || "left",
          ),
        }))
        .filter(
          (section) => section.title || section.content || section.imageUrl,
        );
    }

    if (parsed && typeof parsed === "object") {
      return [
        {
          title: String(parsed.title ?? "").trim(),
          content: String(parsed.content ?? parsed.text ?? text).trim(),
          imageUrl: String(parsed.imageUrl ?? parsed.image ?? "").trim(),
          alignment: normalizeAlignment(
            String(parsed.alignment ?? "").trim() || "left",
          ),
        },
      ];
    }
  } catch {
    // Fall back to legacy plain-text storage.
  }

  return [{ title: "Resumen", content: text, imageUrl: "", alignment: "left" }];
}

export function serializeAboutSections(sections: AboutSection[]) {
  const normalized = sections
    .map((section) => ({
      title: section.title.trim(),
      content: section.content.trim(),
      imageUrl: section.imageUrl?.trim() ?? "",
      alignment: normalizeAlignment(section.alignment ?? "left") ?? "left",
    }))
    .filter((section) => section.title || section.content || section.imageUrl);

  return normalized.length ? JSON.stringify(normalized) : "";
}
