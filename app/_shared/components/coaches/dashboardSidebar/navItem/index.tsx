import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "../style.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavItem = ({ title, Icon, path }: SideBarItemPathType) => {
  const pathname = usePathname();
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
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
