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
