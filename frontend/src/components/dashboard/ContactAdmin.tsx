"use client";

import { useEffect, useState } from "react";
import { Contact } from "@/types";
import { upsertContact } from "@/services/adminService";

interface ContactAdminProps {
  token: string;
  contact: Contact | null;
  onRefresh: () => void;
}

export function ContactAdmin({ token, contact, onRefresh }: ContactAdminProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (contact) {
      setEmail(contact.email ?? "");
      setPhone(contact.phone ?? "");
      setLinkedin(contact.linkedin ?? "");
      setGithub(contact.github ?? "");
    }
  }, [contact]);

  async function handleSave() {
    try {
      setStatus("Guardando información de contacto...");
      await upsertContact(token, {
        id: contact?.id,
        email,
        phone,
        linkedin,
        github,
      });
      setStatus("Información de contacto actualizada correctamente.");
      onRefresh();
    } catch (error) {
      setStatus(`Error al actualizar contacto: ${error}`);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">Contacto</h2>
        <p className="mt-2 text-slate-400">
          Edita los datos públicos visibles en la página de contacto.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-slate-300">Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm text-slate-300">Teléfono</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm text-slate-300">LinkedIn</span>
          <input
            value={linkedin}
            onChange={(event) => setLinkedin(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm text-slate-300">GitHub</span>
          <input
            value={github}
            onChange={(event) => setGithub(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          Guardar contacto
        </button>
        <span className="text-sm text-slate-400">{status}</span>
      </div>
    </section>
  );
}
