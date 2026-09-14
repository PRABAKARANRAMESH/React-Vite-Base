import { Grid3 } from "iconsax-react";
import type { ComponentType } from "react";
import { uniqueId } from "lodash";

type IconsaxProps = React.ComponentProps<typeof Grid3>;

export type MenuBadgeColor = "success" | "warning" | "error" | "info" | "default";

export interface MenuItem {
  id: string;
  title: string;
  icon?: ComponentType<IconsaxProps>;
  href: string;
  hasAccess?: string[];
  badge?: string | number;
  badgeColor?: MenuBadgeColor;
  children?: MenuItem[];
}

const Menuitems: MenuItem[] = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: Grid3,
    href: "/dashboard",
    hasAccess: ["*"],
  },
];

export default Menuitems;
