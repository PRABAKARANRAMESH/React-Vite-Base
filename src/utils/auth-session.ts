/**
 * bank-automation pattern:
 * - HttpOnly JWT cookies: browser sends them (withCredentials)
 * - Readable flag cookie isLoggedIn: route guard only (not the JWT)
 * - No access/refresh tokens in sessionStorage or localStorage
 */

const LOGGED_IN_COOKIE = "isLoggedIn";

let memoryAccessToken: string | null = null;
let unauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  unauthorizedHandler = handler;
};

export const triggerUnauthorized = () => {
  clearAuthSession();
  unauthorizedHandler?.();
};

export const getAccessToken = () => memoryAccessToken;

export const setAuthTokens = (access?: string | null, _refresh?: string | null) => {
  if (access !== undefined) memoryAccessToken = access || null;
};

/** Same as bank-automation checkSessionCookie() */
export const checkSessionCookie = (): boolean => {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith(`${LOGGED_IN_COOKIE}=true`));
};

export const hasLoggedInCookie = checkSessionCookie;

export const markLoggedIn = () => {
  document.cookie = `${LOGGED_IN_COOKIE}=true; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`;
};

export const clearAuthSession = () => {
  memoryAccessToken = null;
  if (typeof document !== "undefined") {
    document.cookie = `${LOGGED_IN_COOKIE}=; Path=/; Max-Age=-99999999; SameSite=Lax`;
  }
  try {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("users");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("users");
  } catch {
    /* ignore */
  }
};

export const pickTokensFromLogin = (res: any): { access?: string; refresh?: string } => {
  const roots = [res, res?.data, res?.data?.data, res?.result, res?.payload].filter(Boolean);
  for (const root of roots) {
    const access = root.access_token || root.accessToken || root.token || root.jwt;
    const refresh = root.refresh_token || root.refreshToken;
    if (access || refresh) return { access, refresh };
  }
  return {};
};

export const clearAuthTokens = clearAuthSession;
export const purgeStoredTokens = clearAuthSession;
