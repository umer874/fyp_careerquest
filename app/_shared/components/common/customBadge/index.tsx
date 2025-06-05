"use client";
import classNames from "classnames";
import styles from "./style.module.scss";

interface CustomBadgeProps {
  title: string | any;
  bg?: string | any;
  textColor?: string | any;
  borderColor?: string | any;
  textUppercase?: string | any;
}

const CustomBadge = ({
  title,
  bg = "#DFF4FD",
  textColor = "#0092D6",
  borderColor = "#DFF4FD",
  textUppercase = "capitalize",
}: CustomBadgeProps) => {
  return (
    <div
      style={{
        borderColor: borderColor,
        backgroundColor: bg,
      }}
      className={classNames(styles.badge_container)}
    >
      <span
        style={{ color: textColor, textTransform: textUppercase }}
        className={classNames(styles.badge_title)}
      >
        {title}
      </span>
    </div>
  );
};

export default CustomBadge;
