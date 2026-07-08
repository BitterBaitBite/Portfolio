"use client";

import { ProjectFilterProps } from "@/components/projects/ProjectFilters";
import { useMemo, useState } from "react";

export function useProjectFilters(initialTags: string[] = []) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tags, setTags] = useState<string[]>(initialTags);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (title) {
      params.set("title", title);
    }
    if (subtitle) {
      params.set("subtitle", subtitle);
    }
    if (tags.length) {
      params.set("tags", tags.join(","));
    }

    return params.toString();
  }, [title, subtitle, tags]);

  function toggleTag(tag: string) {
    setTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  }

  function resetFilters() {
    setTitle("");
    setSubtitle("");
    setTags([]);
  }

  return {
    title,
    setTitle,
    subtitle,
    setSubtitle,
    activeTags: tags,
    toggleTag,
    resetFilters,
    queryString,
  };
}
