import { buildUrl } from "@/lib/api";
import Link from "next/link";

export function Footer() {
  const githubUrl = "https://www.github.com/" + process.env.GITHUB_USERNAME;
  const itchioUrl = `https://${process.env.GITHUB_USERNAME}.itch.io`;
  const thmUrl = "https://tryhackme.com/p/" + process.env.THM_USERNAME;
  const htbUrl = "https://profile.hackthebox.com/profile/" + process.env.HTB_ID;

  return (
    <footer
      className={[
        "flex flex-col gap-6",
        "border-t border-slate-800 p-6 text-sm text-slate-500",
      ].join(" ")}
    >
      <main className="flex flex-row gap-12 justify-center items-start">
        <article className="flex flex-col min-w-36">
          <h2 className="text-sm font-semibold uppercase py-1">Main links</h2>

          <hr className="border-zinc-700 my-2" />

          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/projects" aria-label="Projects">
                Projects
              </Link>
            </li>

            <li>
              <Link href="/about" aria-label="About me">
                About me
              </Link>
            </li>

            <li>
              <Link href="/curriculum-vitae" aria-label="My CV">
                My CV
              </Link>
            </li>

            <li>
              <Link href="/contact" aria-label="About me">
                Contact
              </Link>
            </li>
          </ul>
        </article>

        <article className="flex flex-col min-w-36">
          <h2 className="text-sm font-semibold uppercase py-1">
            Platform profiles
          </h2>

          <hr className="border-zinc-700 my-2" />

          <ul className="flex flex-col gap-1">
            <li>
              <Link href={githubUrl} aria-label="Github profile">
                Github profile
              </Link>
            </li>

            <li>
              <Link href={itchioUrl} aria-label="Itch.io profile">
                Itch.io profile
              </Link>
            </li>

            <li>
              <Link href={thmUrl} aria-label="TryHackMe profile">
                TryHackMe profile
              </Link>
            </li>

            <li>
              <Link href={htbUrl} aria-label="HackTheBox profile">
                HackTheBox profile
              </Link>
            </li>
          </ul>
        </article>
      </main>

      <p>
        Built with Next.js, TypeScript, TailwindCSS, and a NestJS backend.
        Test-driven development.
      </p>
    </footer>
  );
}
