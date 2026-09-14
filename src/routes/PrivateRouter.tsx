import Loadable from "@/layouts/shared/loadable/Loadable";
import { lazy, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkSessionCookie } from "@/utils/auth-session";

const FullLayout = Loadable(lazy(() => import("@/layouts/full-layout/FullLayout")));

/** Same as bank-automation: stay in app while isLoggedIn cookie exists. */
export const PrivateRoute = () => {
  const [auth, setAuth] = useState(checkSessionCookie());

  useEffect(() => {
    const interval = setInterval(() => {
      setAuth(checkSessionCookie());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return auth ? <FullLayout /> : <Navigate to="/auth/login" replace />;
};
