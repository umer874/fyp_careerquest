"use client";
import Tippy from "@tippyjs/react";
import classNames from "classnames";
import styles from "./style.module.scss";
import "tippy.js/dist/tippy.css";

interface CustomToolTipProps {
  children: React.ReactNode;
  label: React.ReactNode;
  trigger?: string;
}

const CustomToolTip = ({
  children,
  label,
  trigger = "mouseenter focus",
}: CustomToolTipProps) => {
  return (
    <Tippy
      content={<div className={classNames(styles.tooltipContent)}>{label}</div>}
      trigger={trigger}
      interactive={true}
    >
      <div className={classNames(styles.tooltipTrigger)}>{children}</div>
    </Tippy>
  );
};

export default CustomToolTip;
