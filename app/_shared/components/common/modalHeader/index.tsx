"use client";
import { Icons } from "assets";
import classNames from "classnames";
import styles from "./style.module.scss";

interface HeaderProps {
  title: string;
  isBack?: boolean;
  handleClose: () => void;
  handleBack?: () => void;
}

const ModalHeader = ({
  title,
  isBack = false,
  handleClose,
  handleBack,
}: HeaderProps) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center w-full",
        styles.header
      )}
    >
      <div
        className={classNames(styles.backArrowContainer)}
        onClick={handleBack}
      >
        {isBack ? <Icons.ArrowLeft /> : null}
      </div>
      <div className="flex justify-center">
        <p className={classNames(styles.title)}>{title}</p>
      </div>
      <div className={classNames(styles.crossContainer)} onClick={handleClose}>
        <Icons.Cross />
      </div>
    </div>
  );
};

export default ModalHeader;
