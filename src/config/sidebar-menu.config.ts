import {
  Boxes,
  CirclePercent,
  LayoutDashboard,
  type LucideIcon,
  PackageSearch,
  SquareActivity,
  TrendingUpDown,
  User,
  UsersRound,
  ShieldCheck,
  Briefcase,
  PlusCircle,
  List,
} from "lucide-vue-next";

export type SidebarMenuConfigType = {
  name: string;
  icon: LucideIcon;
  path?: string;
  hasSubMenu?: boolean;
  subMenu?: SidebarMenuConfigType[];
};

export const sidebarMenuConfig: SidebarMenuConfigType[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/app/dashboard",
  },
  {
    name: "Variants",
    icon: TrendingUpDown,
    path: "/app/variant-types",
  },
  {
    name: "Categories",
    icon: Boxes,
    path: "",
  },
  {
    name: "Products",
    icon: PackageSearch,
    hasSubMenu: true,
    subMenu: [
      {
        name: "Add Product",
        path: "",
        icon: PlusCircle,
      },
      {
        name: "View Products",
        path: "",
        icon: List,
      },
    ],
  },
  {
    name: "Inventory",
    icon: SquareActivity,
    hasSubMenu: true,
    subMenu: [
      {
        name: "Inventory Overview",
        path: "",
        icon: SquareActivity,
      },
      {
        name: "Transfer Stock",
        path: "",
        icon: CirclePercent,
      },
    ],
  },
  {
    name: "Users",
    icon: User,
    hasSubMenu: true,
    subMenu: [
      {
        name: "All Users",
        path: "",
        icon: UsersRound,
      },
      {
        name: "Roles",
        path: "",
        icon: Briefcase,
      },
      {
        name: "Permissions",
        path: "",
        icon: ShieldCheck,
      },
    ],
  },
];
