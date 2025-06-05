"use client";
import { useState, useRef, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import { Icons, Images } from "assets";
import classNames from "classnames";
import { routeConstant } from "routes/constants";
import Link from "next/link";
import { useRouter } from "next13-progressbar";
import { resetRedux } from "utils/helper";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MyContext } from "utils/myContext";
import { useSelector } from "react-redux";

interface ProfileDropdownDashboardProps {
  path?: any;
}

const ProfileDropdownDashboard = ({ path }: ProfileDropdownDashboardProps) => {
  const { auth } = useSelector((state: any) => state.root);
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
      path: path,
    },
  ];

  return (
    <div
      className={classNames(styles.dropdown, "flex items-center gap-2")}
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        className={classNames(
          styles.dropdownToggle,
          "flex items-center gap-2 "
        )}
      >
        <Image
          width={44}
          height={44}
          src={
            auth?.user?.profile_asset?.full_path
              ? auth?.user?.profile_asset?.full_path
              : Images.DefaultAvatar
          }
          alt="profile"
        />
        <div className="text-left hidden xs:block">
          <h6 className={classNames(styles.userName)}>
            {auth?.user?.first_name + " " + auth?.user?.last_name}
          </h6>
          <p className={classNames(styles.userEmail)}>{auth?.user?.email}</p>
        </div>
        <Icons.ChevDownFilled />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <ul className={styles.menuItems}>
            <li className="h-16 block xs:hidden bg-[#0092D6]">
              <div className="text-left">
                <h5 className="text-white">
                  {auth?.user?.first_name + " " + auth?.user?.last_name}
                </h5>
                <p className="text-gray-100 text-xs">{auth?.user?.email}</p>
              </div>
            </li>
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

export default dynamic(() => Promise.resolve(ProfileDropdownDashboard), {
  ssr: false,
  loading: () => {
    const value = useContext(MyContext);

    if (!value || !value.user) {
      return null; // Return null to avoid the error
    }

    return (
      <div
        className={classNames(
          styles.actionContainer,
          "gap-3 items-center hidden sm:flex"
        )}
      >
        <div className={classNames(styles.dropdown, "flex items-center gap-2")}>
          <button
            className={classNames(
              styles.dropdownToggle,
              "flex items-center gap-2 "
            )}
          >
            <Image
              width={44}
              height={44}
              src={
                value.user.profile_asset
                  ? value.user.profile_asset
                  : Images.DefaultAvatar
              }
              alt="profile"
            />
            <div className="text-left hidden xs:block">
              <h6 className={classNames(styles.userName)}>
                {value.user.first_name + " " + value.user.last_name}
              </h6>
              <p className={classNames(styles.userEmail)}>
                {value.user.email}
              </p>
            </div>
            <Icons.ChevDownFilled />
          </button>
        </div>
      </div>
    );
  },
});

