import Loadable from "@/layouts/shared/loadable/Loadable";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { checkSessionCookie } from "@/utils/auth-session";

const AuthLayout = Loadable(lazy(() => import("@/layouts/auth-layout/AuthLayout")));

/** Same as bank-automation: login page only if isLoggedIn cookie is missing. */
export const PublicRoute = () => {
  const isAuthenticated = checkSessionCookie();
  return !isAuthenticated ? <AuthLayout /> : <Navigate to="/dashboard" replace />;
};
