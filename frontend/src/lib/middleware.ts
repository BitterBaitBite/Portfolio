import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DASHBOARD_ROUTE,
  DASHBOARD_MATCHER,
  LOGIN_ROUTE,
  isDashboardPath,
} from "@/config/routes";
import { PORTFOLIO_TOKEN_COOKIE } from "@/config/auth";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  if (!isDashboardPath(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(PORTFOLIO_TOKEN_COOKIE)?.value;
  if (!token) {
    url.pathname = LOGIN_ROUTE;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: DASHBOARD_MATCHER,
};
