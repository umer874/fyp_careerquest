import { Icons } from "assets";
import classNames from "classnames";
import BreadCrumb from "components/common/breadCrumb";
import NotificationsDropdown from "components/common/headerComponents/notificationsDropdown";
import ProfileDropdownDashboard from "components/common/headerComponents/profileDropdownDashboard";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setAuthReducer } from "redux/reducers/authSlice";
import { setBreadCrumb } from "redux/reducers/breadCrumbSlice";
import { routeConstant } from "routes/constants";
import { initSocket } from "services/socket";
import { AddFcmTokenService, GetUpdateUserService } from "services/user";
import { findScreenTitle } from "utils/helper";
import { MyContext } from "utils/myContext";
import styles from "./style.module.scss";
import { requestNotificationPermission } from "services/firebase";
import { fellowRoutes } from "routes/authRoutes";

interface Props {
  openMobile: () => void;
  userCookie: any;
}

function DashboardHeader({ openMobile, userCookie }: Props) {
  const { auth } = useSelector((state: any) => state.root);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies();

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
      if (navigator?.serviceWorker) {
        requestPermission();
      }
      //@ts-error
    }, [navigator?.serviceWorker]);
  }

  useEffect(() => {
    dispatch(
      setBreadCrumb({
        crumbs: [
          {
            title: findScreenTitle(pathname, fellowRoutes),
          },
        ],
        prePath: pathname,
      })
    );
    // eslint-disable-next-line
  }, [pathname]);

  useEffect(() => {
    handleGetUpdatedUser();
    //  initSocket(userCookie.id);
  }, []);

  return (
    <>
      <div className={classNames(styles.topLevelContainer)}>
        <div
          className={classNames(
            "w-full",
            styles.headerContainer,
            "flex justify-between px-3"
          )}
        >
          <div className={classNames("flex items-center gap-3")}>
            <div  className={classNames(styles.hamburgerIcon)}
              onClick={openMobile}>
            <Icons.Hamburger />
            </div>
            <BreadCrumb />
          </div>
          <div className="flex items-center sm:gap-6 gap-3">
            <div className={classNames(styles.notificationsContainer)}>
              <NotificationsDropdown />
            </div>
            <div className={classNames(styles.profileContainer)}>
              <MyContext.Provider value={{ user: userCookie }}>
                <ProfileDropdownDashboard
                  path={routeConstant.fellow.profileSettings.path}
                />
              </MyContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;
