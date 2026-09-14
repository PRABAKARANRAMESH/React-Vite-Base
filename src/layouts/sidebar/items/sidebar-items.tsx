import { List } from "@mui/material";
import Menuitems from "./menu-items";
import { useUsers } from "@/context/user-context/user-context";
import ScrollableWrapper from "@/components/common/ScrollableWrapper";
import { useAppSelector, type RootState } from "@/store/store";
import NavItem from "./NavItem";
import type { MenuItem } from "./menu-items";

const filterByAccess = (items: MenuItem[], roleName?: string): MenuItem[] =>
  items
    .filter((item) => {
      if (!item.hasAccess) return false;
      if (item.hasAccess.includes("*")) return true;
      if (!roleName) return false;
      return item.hasAccess.includes(roleName);
    })
    .map((item) => ({
      ...item,
      children: item.children
        ? filterByAccess(item.children, roleName)
        : undefined,
    }));

const SidebarItems = () => {
  const { user } = useUsers();
  const customizer = useAppSelector((state: RootState) => state.customizer);
  const isCollapsed = customizer.isCollapse || false;

  const accessibleMenuItems = filterByAccess(
    Menuitems,
    user?.role?.name
  );

  return (
    <ScrollableWrapper
      sx={{
        height: "100%",
        px: isCollapsed ? 1 : 1.5,
        py: 1,
        transition: "padding 200ms ease",
      }}
    >
      <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
        {accessibleMenuItems.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </List>
    </ScrollableWrapper>
  );
};

export default SidebarItems;
