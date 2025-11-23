import homeIcon from "../icons/home.png";
import documentIcon from "../icons/document.png";
import listCheckingIcon from "../icons/list-check.png";
import settingsIcon from "../icons/settings.png";

export type SidebarTabOptionsType = {
  icon: string;
  label: OwnerDashboardTabs;
  link: string;
};

export enum OwnerDashboardTabs {
  OVERVIEW = "Overview",
  ORDERS = "Orders",
  MENUS = "Menus",
  SETTING = "Setting",
}

export const sidebarTabOptions: SidebarTabOptionsType[] = [
  {
    label: OwnerDashboardTabs.OVERVIEW,
    icon: homeIcon,
    link: "/dashboard/overview",
  },
  {
    label: OwnerDashboardTabs.ORDERS,
    icon: documentIcon,
    link: "/dashboard/orders",
  },
  {
    label: OwnerDashboardTabs.MENUS,
    icon: listCheckingIcon,
    link: "/dashboard/menus",
  },
  {
    label: OwnerDashboardTabs.SETTING,
    icon: settingsIcon,
    link: "/dashboard/setting",
  },
];
