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
      <main>
        <article>
          <h2>Main links</h2>

          <ul>
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
              <Link href="/contact" aria-label="About me">
                Contact
              </Link>
            </li>
          </ul>
        </article>

        <article>
          <h2>Platform profiles</h2>

          <ul>
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
