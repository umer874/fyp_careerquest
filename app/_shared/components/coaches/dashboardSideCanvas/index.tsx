import { Icons, Images } from "assets";
import classNames from "classnames";
import { toastMessage } from "components/common/toast";
import ConfirmationModal from "modals/confirmationModal";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetAuthReducer } from "redux/reducers/authSlice";
import { routeConstant } from "routes/constants";
import NavItem from "./navItem";
import styles from "./style.module.scss";

interface SideCanvasProps {
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
  sidebarArr: SideBarItemsType[];
}

const DashboardSideCanvas = ({
  isOpen,
  setIsOpen,
  sidebarArr,
}: SideCanvasProps) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);

  const handleOpenConfirmationModal = () => {
    setOpenConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setOpenConfirmationModal(false);
  };

  const handleLogout = () => {
    dispatch(resetAuthReducer());
    toastMessage("success", "Logged out successfully");
  };

  function handleClick(e: any) {
    const elem: any = document.getElementById("sideCanvas");
    if (!elem.contains(e.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    let elem: any = document.getElementById("backDropContainer");
    elem.addEventListener("click", (event: any) => {
      handleClick(event);
    });

    // eslint-disable-next-line
  }, [pathname]);

  return (
    <div
      className={classNames(styles.backDropContainer, "md:hidden h-full")}
      style={isOpen ? { visibility: "visible" } : { visibility: "hidden" }}
      id="backDropContainer"
    >
      <div
        className={classNames(
          "h-full",
          styles.mainContainer,
          isOpen ? styles.shown : styles.hidden
        )}
        id="sideCanvas"
      >
        <div
          className={classNames(
            "flex justify-between items-center px-4 gap-4",
            styles.logoContainer
          )}
        >
          <Link href={routeConstant.home.path}>
            <Image
              width={184}
              height={41}
              src={Images.LogoDashboard}
              alt="logo"
            />
          </Link>
          <div
            className={classNames(styles.crossContainer)}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <Icons.Cross />
          </div>
        </div>
        <div className={classNames("flex flex-col justify-between h-full")}>
          <div className="flex flex-col gap-0.5">
            {sidebarArr?.map((item, inx) => {
              return (
                <div className="flex flex-col items-start gap-0.5" key={inx}>
                  <label className={classNames(styles.navTitle)}>
                    {item?.title}
                  </label>

                  <div className="w-full">
                    {item?.paths?.map(
                      (s: SideBarItemPathType, s_inx: number) => {
                        const props = {
                          ...s,
                          setIsOpen,
                        };
                        return <NavItem {...props} key={s_inx} />;
                      }
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <label className={classNames(styles.navTitle, "mb-3")}>Help</label>
            <NavItem
              title="Contact"
              Icon={Icons.Support}
              path={routeConstant.coach.contact.path}
              setIsOpen={setIsOpen}
            />
            <div
              className={classNames(styles.navItemContainer)}
              onClick={handleOpenConfirmationModal}
            >
              <Icons.Logout className={classNames(styles.logoutIcon)} />
              <label
                className={classNames(
                  styles.heading,
                  styles.logout,
                  "cursor-pointer"
                )}
              >
                Logout
              </label>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        // @ts-ignore
        show={openConfirmationModal}
        handleClose={handleCloseConfirmationModal}
        subtitle="Are you sure you want to logout?"
        actionButtonText="Yes, Logout"
        handleSubmit={handleLogout}
      />
    </div>
  );
};

export default DashboardSideCanvas;
