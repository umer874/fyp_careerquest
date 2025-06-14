import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { routeConstant } from "routes/constants";
import styles from "../style.module.scss";
import { SideBarItemPathType } from "_shared/types/navigation";

interface navItemInterface extends SideBarItemPathType {
  setIsOpen: (val: boolean) => void;
  isBlank?: boolean;
}

const NavItem = ({
  title,
  Icon,
  path,
  isBlank,
  setIsOpen,
}: navItemInterface) => {
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
        target={isBlank ? "_blank" : ""}
        href={path ? path : ""}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <Icon />
        <label className={classNames(styles.heading)} role="button">
          {title}
        </label>
      </Link>
    </>
  );
};

export default NavItem;
