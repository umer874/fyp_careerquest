export type SideBarItemsType = {
  title: string;
  paths: SideBarItemPathType[];
};

export type SideBarItemPathType = {
  path: string;
  title: string;
  children?: SideBarItemPathType[];
  nestedItems?: {
    path: string;
    title: string;
  }[];
  Icon?: any;
};
