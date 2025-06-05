import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "../style.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { routeConstant } from "routes/constants";

const NavItem = ({ title, Icon, path }: SideBarItemPathType) => {
  const pathname = usePathname();
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (
      (pathname === routeConstant.fellow.projects.path ||
        pathname === routeConstant.fellow.resume.path) &&
      path === routeConstant.fellow.portfolios.path
    ) {
      setActive(true);
      return;
    }
    setActive(path === pathname);
  }, [pathname, path]);

  return (
    <>
      <Link
        className={classNames(
          active ? styles.activeNavItemContainer : styles.navItemContainer,
          "w-full"
        )}
        href={path || ""}
      >
        {Icon && <Icon />}
        <label className={classNames(styles.heading)} role="button">
          {title}
        </label>
      </Link>
    </>
  );
};

export default NavItem;
