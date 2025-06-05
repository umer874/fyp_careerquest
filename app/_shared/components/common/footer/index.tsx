import Link from "next/link";
import styles from "./style.module.scss";
import classNames from "classnames";
import { headerLinks } from "utils/constants";

const Footer = () => {
  return (
    <footer className={classNames(styles.footer)}>
      <div className={classNames(styles.customContainer, "h-full")}>
        <div className="grid grid-cols-12 h-full">
          <div
            className={classNames(
              styles.footer__copyright,
              "md:col-span-4 col-span-12 flex items-center md:justify-start justify-center md:order-1 order-3 md:mt-0 mt-2"
            )}
          >
            <p>© 2025 CareerQuest. All rights reserved.</p>
          </div>
          <div className="md:col-span-4 xs:col-span-6 col-span-12 flex items-center md:justify-center xs:justify-start justify-center md:order-1">
            <ul className={classNames(styles.menus, "flex gap-4 items-center")}>
              {headerLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.path ? link.path : ""}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 xs:col-span-6 col-span-12 flex items-center xs:justify-end justify-center md:order-2">
            <ul className={classNames(styles.menus, "flex gap-4 items-center")}>
              <li>
                <Link href={""}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={""}>Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
