"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { About, Contact, CurriculumVitae, Project, Tag } from "@/types";
import {
  getAbout,
  getContact,
  getCurriculumVitae,
  getProjects,
  getTags,
} from "@/services/projectService";
import { validateSession } from "@/services/adminService";
import { PORTFOLIO_TOKEN_LOCAL_STORAGE_KEY } from "@/config/auth";
import { ProjectAdmin } from "@/components/dashboard/ProjectAdmin";
import { TagAdmin } from "@/components/dashboard/TagAdmin";
import { AboutAdmin } from "@/components/dashboard/AboutAdmin";
import { ContactAdmin } from "@/components/dashboard/ContactAdmin";
import { CurriculumVitaeAdmin } from "@/components/dashboard/CurriculumVitaeAdmin";

export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [about, setAbout] = useState<About | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [curriculumVitae, setCurriculumVitae] =
    useState<CurriculumVitae | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem(
      PORTFOLIO_TOKEN_LOCAL_STORAGE_KEY,
    );
    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);
    validateSession(storedToken)
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setError("Sesión inválida. Inicia sesión de nuevo.");
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!token || !isAuthenticated) {
      return;
    }

    loadAdminData();
  }, [token, isAuthenticated]);

  async function loadAdminData() {
    if (!token) {
      return;
    }

    setError(null);
    try {
      const [projectList, tagList, aboutData, contactData, curriculumData] =
        await Promise.all([
          getProjects(),
          getTags(),
          getAbout(),
          getContact(),
          getCurriculumVitae(),
        ]);

      setProjects(projectList);
      setTags(tagList);
      setAbout(aboutData);
      setContact(contactData);
      setCurriculumVitae(curriculumData);
    } catch (fetchError) {
      setError(`Error cargando datos: ${fetchError}`);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem(PORTFOLIO_TOKEN_LOCAL_STORAGE_KEY);
    setToken(null);
    setIsAuthenticated(false);
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl py-10 text-slate-300">
        <p>Cargando admin dashboard...</p>
      </section>
    );
  }

  if (!token || !isAuthenticated) {
    return (
      <section className="mx-auto max-w-3xl py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-glow text-slate-300">
          <h1 className="text-3xl font-semibold text-white">Admin Dashboard</h1>
          <p className="mt-4 text-slate-400">
            Necesitas iniciar sesión para gestionar el contenido del portfolio.
          </p>
          {error ? <p className="mt-4 text-red-400">{error}</p> : null}
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Ir a login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-10">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Gestiona proyectos, etiquetas y el contenido About de tu
              portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-slate-700 bg-slate-950 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Cerrar sesión
          </button>
        </div>

        {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <ProjectAdmin
            token={token}
            projects={projects}
            tags={tags}
            onRefresh={loadAdminData}
          />

          <AboutAdmin token={token} about={about} onRefresh={loadAdminData} />

          <ContactAdmin token={token} contact={contact} onRefresh={loadAdminData} />

          <CurriculumVitaeAdmin
            token={token}
            curriculumVitae={curriculumVitae}
            onRefresh={loadAdminData}
          />
        </div>

        <TagAdmin token={token} tags={tags} onRefresh={loadAdminData} />
      </div>
    </section>
  );
}
