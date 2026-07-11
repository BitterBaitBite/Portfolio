import { About, Contact, CurriculumVitae, Project, Tag } from "@/types";
import { buildUrl, fetcher } from "@/lib/api";

export interface ProjectFilter {
  title?: string;
  subtitle?: string;
  tags?: string[];
}

export async function getProjects(filter: ProjectFilter = {}) {
  const query: Record<string, string | string[]> = {};

  if (filter.title) {
    query.title = filter.title;
  }

  if (filter.subtitle) {
    query.subtitle = filter.subtitle;
  }

  if (filter.tags && filter.tags.length > 0) {
    query.tags = filter.tags;
  }

  const url = buildUrl("/projects", query);
  return fetcher<Project[]>(url);
}

export async function getProject(id: string) {
  return fetcher<Project>(buildUrl(`/projects/${id}`));
}

export async function getTags() {
  return fetcher<Tag[]>(buildUrl("/tags"));
}

export async function getAbout() {
  return fetcher<About>(buildUrl("/about"));
}

export async function getContact() {
  return fetcher<Contact>(buildUrl("/contact"));
}

export async function getCurriculumVitae() {
  return fetcher<CurriculumVitae>(buildUrl("/curriculum-vitae"));
}
