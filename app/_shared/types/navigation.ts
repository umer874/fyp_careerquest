type SideBarItemsType = {
  title: string;
  paths: SideBarItemPathType[];
};

type SideBarItemPathType = {
  path: string;
  title: string;
  children?: SideBarItemPathType[];
  nestedItems?: {
    path: string;
    title: string;
  }[];
  Icon?: any;
};
