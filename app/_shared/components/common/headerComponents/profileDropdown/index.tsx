import { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import { Icons, Images } from "assets";
import classNames from "classnames";
import { routeConstant } from "routes/constants";
import Link from "next/link";
import { useRouter } from "next13-progressbar";
import { resetRedux } from "utils/helper";
import Image from "next/image";

interface ProfileDropdownProps {
   user: {
    firstName: string;
    email: string;
    avatar: string;
  };
}

const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setIsOpen(false);
    resetRedux();
    router.push(routeConstant.login.path);
  };

  const handleOptionSelect = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      icon: <Icons.SettingsIcon />,
      title: "Profile Settings",
      path: routeConstant.profileSettings.path,
    },
  ];

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={classNames(styles.dropdownToggle, "flex items-end")}
      >
        <Image
          width={44}
          height={44}
          src={user?.avatar ? user?.avatar : Images.DefaultAvatar}
          alt="profile"
        />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div
            className={classNames(styles.userInfo, "flex items-center gap-3")}
          >
            <Image
              width={56}
              height={56}
              src={user?.avatar ?? Images.DefaultAvatar}
              alt="profile"
            />
            <div>
              <h4 className={styles.userName}>{user?.firstName}</h4>
              <p className={styles.userEmail}>{user?.email}</p>
            </div>
          </div>
          <ul className={styles.menuItems}>
            {menuItems.map((items, index) => (
              <li
                key={index}
                onClick={() => {
                  handleOptionSelect(items?.path);
                }}
              >
                <Link
                  className="flex items-center gap-3 h-full w-full"
                  href={items.path}
                >
                  {items.icon}
                  {items.title}
                </Link>
              </li>
            ))}
            <li className={classNames(styles.logout)} onClick={handleLogout}>
              <Link
                className={classNames(styles.logout, "flex items-center gap-3")}
                href=""
              >
                <Icons.Logout />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
