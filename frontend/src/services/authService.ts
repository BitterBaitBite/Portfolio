import { AuthResponse } from "@/types";
import { buildUrl, fetcher } from "@/lib/api";

export async function login(email: string, password: string) {
  return fetcher<AuthResponse>(buildUrl("/auth/login"), {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
