export const DASHBOARD_ROUTE = "/dashboard";
export const LOGIN_ROUTE = "/login";

export function isDashboardPath(pathname: string) {
  return pathname.startsWith(DASHBOARD_ROUTE);
}
