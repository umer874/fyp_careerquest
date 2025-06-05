"use client";
import { useState } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { Icons } from "assets";

interface CustomAlertProps {
  bg?: string;
  textColor?: string;
  children: React.ReactNode;
}

const CustomAlert = ({
  children,
  bg = "#FBD2C1",
  textColor = "#ED1C24",
}: CustomAlertProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{ backgroundColor: bg }}
      className={classNames(styles.badge_container)}
    >
      <span
        style={{ color: textColor }}
        className={classNames(styles.badge_title, "flex items-center gap-2")}
      >
        {children}
      </span>
      <button
        className={classNames(styles.close_button)}
        onClick={() => setVisible(false)}
      >
        <Icons.Cross />
      </button>
    </div>
  );
};

export default CustomAlert;
