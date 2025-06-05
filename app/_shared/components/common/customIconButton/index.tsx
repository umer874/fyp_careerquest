"use client";
import classNames from "classnames";
import styles from "./style.module.scss";

interface CustomIconButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const CustomIconButton = ({
  onClick,
  disabled,
  children,
}: CustomIconButtonProps) => {
  return (
    <button
      className={classNames(styles.customBtnContainer)}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default CustomIconButton;
