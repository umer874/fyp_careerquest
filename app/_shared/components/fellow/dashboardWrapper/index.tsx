"use client";
import classNames from "classnames";
import { useState } from "react";
import { fellowDashboardConstants } from "utils/constants";
import DashboardHeader from "../dashboardHeader";
import DashboardSidebar from "../dashboardSidebar";
import DashboardSideCanvas from "../dashboardSideCanvas";
import styles from "./style.module.scss";

interface Props {
  children: any;
  user: any;
}

function FellowDashboardWrapper({ children,user }: Props) {
  const [isSideCanvas, setIsSideCanvas] = useState<boolean>(false);
  const handleOpen = () => {
    setIsSideCanvas(!isSideCanvas);
  };

  return (
    <div className={classNames(styles.topLevelContainer, "p-0 m-0 ")}>
      <DashboardSideCanvas
        isOpen={isSideCanvas}
        setIsOpen={setIsSideCanvas}
        sidebarArr={fellowDashboardConstants}
      />
      <aside
        className={classNames(styles.sideNavContainer, styles.sideNavFull)}
        id="sideNav"
      >
        <DashboardSidebar sidebarArr={fellowDashboardConstants} />
      </aside>

      <main id="mainContainer" className={classNames(styles.mainContainer)}>
        <DashboardHeader openMobile={handleOpen} userCookie={user} />
        <div
          // id="container-padding"
          className={classNames(
            styles.child,
            styles.listContainerStyle,
            styles.containerPadding
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

export default FellowDashboardWrapper;
