export type SidebarTabOptionsType = {
  label: OwnerDashboardTabs;
  link: string;
};

export enum OwnerDashboardTabs {
  OVERVIEW = "Overview",
  ORDERS = "Orders",
  MENUS = "Menus",
  SETTING = "Setting",
}

export const ownerSidebarTabs: SidebarTabOptionsType[] = [
  {
    label: OwnerDashboardTabs.OVERVIEW,
    link: "/dashboard/overview",
  },
  {
    label: OwnerDashboardTabs.ORDERS,
    link: "/dashboard/orders",
  },
  {
    label: OwnerDashboardTabs.MENUS,
    link: "/dashboard/menus",
  },
  {
    label: OwnerDashboardTabs.SETTING,
    link: "/dashboard/setting",
  },
];
