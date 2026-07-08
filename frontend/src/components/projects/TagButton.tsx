"use client";

import { Tag } from "@/types";

interface TagButtonProps {
  tag: Tag;
  toggleTag: (tag: string) => void;
  active: boolean;
}

export default function TagButton({ tag, toggleTag, active }: TagButtonProps) {
  return (
    <button
      onClick={() => toggleTag(tag.name)}
      className={`rounded-full px-3 py-0 text-sm transition ${
        active
          ? "bg-sky-500 text-slate-950"
          : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
      }`}
    >
      {tag.name}
    </button>
  );
}
