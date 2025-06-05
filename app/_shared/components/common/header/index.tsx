"use client";
import { Icons, Images } from "assets";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { routeConstant } from "routes/constants";
import { headerLinks } from "utils/constants";
import { MyContext } from "utils/myContext";
import SideCanvas from "../sideCanvas";
import DynamicActions from "./dynamicActions";
import styles from "./style.module.scss";
import { AddFcmTokenService, GetUpdateUserService } from "services/user";
import { useDispatch, useSelector } from "react-redux";
import { setAuthReducer } from "redux/reducers/authSlice";
import { useCookies } from "react-cookie";
import { requestNotificationPermission } from "services/firebase";

interface HeaderProps {
  userCookie: any;
}

const Header = ({ userCookie }: HeaderProps) => {
  const { auth } = useSelector((state: any) => state.root);

  const pathname = usePathname();
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies();
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  const handleGetUpdatedUser = () => {
    GetUpdateUserService()
      .then(({ data, status }) => {
        if (status) {
          dispatch(
            setAuthReducer({
              ...auth,
              user: data?.data,
            })
          );
          setCookie(
            "user",
            JSON.stringify({
              isLoggedIn: true,
              id: data?.data?.id,
              first_name: data?.data?.first_name,
              last_name: data?.data?.last_name,
              email: data?.data?.email,
              role: data?.data?.type,
              profile_asset: data?.data?.profile_asset?.full_path ?? "",
              resume_asset: data?.data?.resume_asset?.full_path ?? "",
            }),
            {
              path: "/",
              maxAge: 3600 * 24 * 30,
              sameSite: true,
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const requestPermission = () => {
    try {
      Notification.requestPermission().then(async (permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          const token = await requestNotificationPermission();
          if (token !== null) {
            try {
              await AddFcmTokenService({ fcm_token: token });
            } catch (err) {
              console.log("Error in adding fcm token", err);
            }
          }
        } else {
          console.log("Unable to get permission to notify.");
        }
      });
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  if (typeof window !== "undefined") {
    useEffect(() => {
      if (navigator?.serviceWorker && auth?.isLoggedIn) {
        requestPermission();
      }
      //@ts-error
    }, [navigator?.serviceWorker, auth?.isLoggedIn]);
  }

  useEffect(() => {
    if (auth?.isLoggedIn) {
      handleGetUpdatedUser();
    }
  }, [auth?.isLoggedIn]);

  return (
    <>
      <SideCanvas isOpen={openSideBar} setIsOpen={setOpenSideBar} />
      <header className={classNames(styles.header)}>
        <nav className={classNames(styles.customContainer, "w-full")}>
          <div
            className={classNames(" flex justify-between items-center gap-4")}
          >
            <div className={classNames("flex items-center gap-3")}>
              <div className={classNames(styles.hamIcon, "flex lg:hidden")}
                onClick={() => setOpenSideBar(true)}
                aria-label="Open sidebar">
                <Icons.Hamburger
                />
              </div>



              <Link
                href={routeConstant.home.path}
                className={classNames(styles.site__logo, "flex items-center")}
              >
                <Image
                  src={Images.CareerLogo}
                  alt="Career Quest"
                  width={289}
                  height={92}
                />
              </Link>
            </div>
            <div>
              <ul
                className={classNames(
                  styles.main__menu,
                  "lg:flex items-center gap-8 hidden ms-2"
                )}
              >
                {headerLinks.map((link, index) => (
                  <li key={index} className={classNames("relative group")}>
                    <Link
                      href={link.path || ""}
                      className={classNames(
                        styles.navLink,
                        (pathname === link.path ||
                          link.children?.some((item) => item.path === pathname)) &&
                        styles.activeLink,
                        "flex items-center"
                      )}
                    >
                      {link.title}
                      {link.children && (
                        <Icons.ChevDown  /> // Ensure this icon is properly imported
                      )}
                    </Link>
                    {link.children && (
                      <ul
                        className={classNames(
                          styles.subMenu,
                          "absolute left-0 hidden group-hover:block bg-white shadow-md"
                        )}
                      >
                        {link.children.map((child, childIndex) => (
                          <li
                            className={classNames(styles.subMenuItem)}
                            key={childIndex}
                          >
                            <Link
                              href={child.path}
                              className={classNames(styles.subMenuLink)}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}

              </ul>
            </div>
            <div
              className={classNames(
                styles.header__right,
                "flex items-center gap-4"
              )}
            >
              <MyContext.Provider value={{ user: userCookie }}>
                <DynamicActions />
              </MyContext.Provider>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
