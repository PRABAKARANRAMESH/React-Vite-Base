import { useNavigate, useLocation } from "react-router-dom";
import HeaderAppBar from "./headercomp";
import { useUsers } from "@/context/user-context/user-context";
import { useMemo } from "react";
import authServices from "@/service/auth-services";
import { useQueryClient } from "@tanstack/react-query";
import { clearAuthSession } from "@/utils/auth-session";

function Header() {
  const nav = useNavigate();
  const location = useLocation();
  const { user, clearUser } = useUsers();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await authServices.logout();
    } catch {
      // ignore
    } finally {
      await queryClient.cancelQueries();
      queryClient.clear();
      clearAuthSession();
      clearUser();
      nav("/auth/login");
    }
  };

  const { title, subtitle } = useMemo(() => {
    const path = location.pathname;
    if (path.includes("/dashboard"))
      return { title: "Dashboard", subtitle: "Overview of your system" };
    return { title: "App", subtitle: "" };
  }, [location.pathname]);

  return (
    <HeaderAppBar
      title={title}
      subtitle={subtitle}
      user={{
        name: user?.username || "User",
        role: user?.role?.name,
      }}
      onLogout={handleLogout}
    />
  );
}

export default Header;
