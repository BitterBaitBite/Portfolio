"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import {
  PORTFOLIO_TOKEN_COOKIE,
  PORTFOLIO_TOKEN_LOCAL_STORAGE_KEY,
  PORTFOLIO_TOKEN_MAX_AGE,
} from "@/config/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await login(email, password);
      // store token in localStorage for client usage
      window.localStorage.setItem(
        PORTFOLIO_TOKEN_LOCAL_STORAGE_KEY,
        response.accessToken,
      );
      // also set a non-HttpOnly cookie so middleware can read it for server-side redirects
      try {
        document.cookie = `${PORTFOLIO_TOKEN_COOKIE}=${response.accessToken}; path=/; max-age=${PORTFOLIO_TOKEN_MAX_AGE}; samesite=lax`;
      } catch (e) {
        // ignore cookie failures in restrictive environments
      }
      router.push("/dashboard");
    } catch (err) {
      setError([err].toString());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl py-10">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-glow">
        <h1 className="text-3xl font-semibold text-white">Admin Login</h1>
        <p className="mt-3 text-slate-400">
          Inicia sesión para administrar proyectos, etiquetas y el contenido de
          About.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </label>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </section>
  );
}
