import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type TagCategory = "lenguaje" | "framework" | "especialidad";

export interface Tag {
  id: string;
  name: string;
  category: TagCategory;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  brief: string;
  description: string;
  url?: string;
  thumbnail?: string;
  image?: string;
  tags: Tag[];
}

export interface About {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
}

export interface Contact {
  id: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
}

export interface CurriculumVitae {
  id: string;
  summary?: string;
  experience?: string[];
  education?: string[];
  credentials?: string[];
  languages?: string[];
  fileUrl?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
}

// Dev.to News API
export interface DevToUser {
  name: string;
  username: string;
  twitter_username: string;
  github_username: string;
  user_id: number;
  website_url: string;
  profile_image: string;
  profile_image_90: string;
}
export interface DevToArticle {
  id: number;
  title: string;
  type_of: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number | null;
  published_timestamp: string;
  language: string; // "en";
  subforem_id: number;
  positive_reactions_count: number;
  cover_image: string | null;
  social_image: string | null;
  canonical_url: string | null;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags: string;
  user: DevToUser;
  flare_tag: {
    name: string;
    bg_color_hex: string;
    text_color_hex: string;
  };
}
