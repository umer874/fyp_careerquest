import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../style.module.scss";

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
    if (path === pathname) {
      setActive(true);
    } else {
      setActive(false);
    }
    // eslint-disable-next-line
  }, [pathname]);

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
