import { Icons, Images } from "assets";
import classNames from "classnames";
import { toastMessage } from "components/common/toast";
import ConfirmationModal from "modals/confirmationModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next13-progressbar";
import { resetAuthReducer } from "redux/reducers/authSlice";
import { routeConstant } from "routes/constants";
import NavItem from "./navItem";
import { resetRedux } from "utils/helper";
import styles from "./style.module.scss";
import { SideBarItemsType,SideBarItemPathType } from "_shared/types/navigation";

interface Props {
  sidebarArr: SideBarItemsType[];
}

function DashboardSidebar({ sidebarArr }: Props) {
  const dispatch = useDispatch();
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);

  const handleOpenConfirmationModal = () => {
    setOpenConfirmationModal(true);
  };

  

  const handleCloseConfirmationModal = () => {
    setOpenConfirmationModal(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
   setIsOpen(false);
    resetRedux();
    router.push(routeConstant.login.path);
    toastMessage("success", "Logged out successfully");
  };

  return (
    <div className={classNames(styles.sidebarWrapper)}>
      <div className="text-center w-full flex flex-col items-start h-full">
        <div className={classNames(styles.logoTopContainerFull, "w-full px-2")}>
          <div
            className={classNames(
              "flex items-center w-full",
              styles.logoContainer
            )}
          >
            <Link href={routeConstant.home.path}>
              <Image
                className="hidden xl:block"
                width={184}
                height={41}
                src={Images.CareerLogo}
                alt="logo"
              />
              <Image
                className="block xl:hidden"
                width={38}
                height={41}
                src={Images.LogoIcon}
                alt="logo"
              />
            </Link>
          </div>
        </div>



        <div
          className={classNames(
            "flex flex-col justify-between h-full mt-6 gap-3"
          )}
        >

          <div>
            <label className={classNames(styles.navTitle, "w-full")}>Main</label>
            <NavItem
              title="Dashbaord"
              Icon={Icons.Dashboard}
              path={routeConstant.fellow.dashboard.path}
            />

          </div>

          <div
            className={classNames(styles.sideNavFull, "flex flex-col gap-0.5")}
          >
            {sidebarArr?.map((item, inx) => {
              return (
                <div className="flex flex-col items-start gap-1" key={inx}>
                  <label className={classNames(styles.navTitle)}>
                    {item?.title}
                  </label>

                  <div className="w-full flex flex-col gap-0">
                    {item?.paths?.map(
                      (s: SideBarItemPathType, s_inx: number) => {
                        const props = {
                          ...s,
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
              path={routeConstant.fellow.contact.path}
            />
            <div
              className={classNames(styles.navItemContainer)}
              onClick={handleOpenConfirmationModal}
            >
              <div className={classNames(styles.logoutIcon)} onClick={handleLogout}>

                <Icons.Logout />
              </div>
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
        isOpen={openConfirmationModal} // ✅ correct prop
        onClose={handleCloseConfirmationModal} // ✅ correct prop
        title="Logout" // ✅ required prop
        description="Are you sure you want to logout?" // ✅ optional
        actionButtonText="Yes, Logout" // ✅ optional
        onConfirm={handleLogout} // ✅ correct prop
      />

    </div>
  );
}

export default DashboardSidebar;
