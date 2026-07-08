import { buildExternalUrl, fetcher } from "@/lib/api";
import { Repo } from "@/types";

export interface GithubRepoFilter {
  sort?: string;
  per_page?: string;
  type?: string[];
}

export async function getRepos(filter: GithubRepoFilter = {}): Promise<Repo[]> {
  const username = process.env.GITHUB_USERNAME;
  const baseUrl = process.env.GITHUB_API_URL;

  const query: Record<string, string | string[]> = {};

  if (filter.sort) {
    query.sort = filter.sort;
  }

  if (filter.per_page) {
    query.per_page = filter.per_page;
  }

  if (filter.type && filter.type.length > 0) {
    query.type = filter.type;
  }

  const url = buildExternalUrl(`${baseUrl}/users/${username}/repos`, query);

  return fetcher<Repo[]>(url, { next: { revalidate: 86400 } });
}
