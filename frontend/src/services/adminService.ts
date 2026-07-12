import { About, Contact, CurriculumVitae, Project, Tag } from "@/types";
import { buildUrl, fetcher } from "@/lib/api";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function validateSession(token: string) {
  return fetcher<{
    authenticated: boolean;
    user: { id: string; email: string; role: string };
  }>(buildUrl("/auth/validate"), {
    method: "GET",
    headers: authHeaders(token),
  });
}

export async function createProject(
  token: string,
  project: Partial<Project> & { tagIds?: string[] },
) {
  return fetcher<Project>(buildUrl("/projects"), {
    method: "POST",
    headers: {
      ...authHeaders(token),
    },
    body: JSON.stringify(project),
  });
}

export async function updateProject(
  token: string,
  id: string,
  project: Partial<Project> & { tagIds?: string[] },
) {
  console.log(project);

  return fetcher<Project>(buildUrl(`/projects/${id}`), {
    method: "PUT",
    headers: {
      ...authHeaders(token),
    },
    body: JSON.stringify(project),
  });
}

export async function deleteProject(token: string, id: string) {
  return fetcher<{ id: string }>(buildUrl(`/projects/${id}`), {
    method: "DELETE",
    headers: {
      ...authHeaders(token),
    },
  });
}

export async function createTag(
  token: string,
  name: string,
  category: Tag["category"],
) {
  return fetcher<Tag>(buildUrl("/tags"), {
    method: "POST",
    headers: {
      ...authHeaders(token),
    },
    body: JSON.stringify({ name, category }),
  });
}

export async function updateTag(
  token: string,
  id: string,
  name?: string,
  category?: Tag["category"],
) {
  return fetcher<Tag>(buildUrl(`/tags/${id}`), {
    method: "PUT",
    headers: {
      ...authHeaders(token),
    },
    body: JSON.stringify({ name, category }),
  });
}

export async function deleteTag(token: string, id: string) {
  return fetcher<{ id: string }>(buildUrl(`/tags/${id}`), {
    method: "DELETE",
    headers: {
      ...authHeaders(token),
    },
  });
}

export async function upsertAbout(
  token: string,
  about: Partial<About> & { id?: string },
) {
  return fetcher<About>(buildUrl("/about/upsert"), {
    method: "PATCH",
    headers: {
      ...authHeaders(token),
    },
    body: JSON.stringify(about),
  });
}

export async function upsertContact(
  token: string,
  contact: Partial<Contact> & { id?: string },
) {
  return fetcher<Contact>(buildUrl("/contact/upsert"), {
    method: "PATCH",
    headers: {
      ...authHeaders(token),
    },
    body: JSON.stringify(contact),
  });
}

export async function upsertCurriculumVitae(
  token: string,
  curriculumVitae: Partial<CurriculumVitae> & { id?: string },
) {
  return fetcher<CurriculumVitae>(buildUrl("/curriculum-vitae/upsert"), {
    method: "PATCH",
    headers: {
      ...authHeaders(token),
    },
    body: JSON.stringify(curriculumVitae),
  });
}
