import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { Icons } from "assets";

interface CustomAccordionProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const CustomAccordion = ({
  title,
  children,
  isOpen,
  onClick,
}: CustomAccordionProps) => {
  return (
    <div
      className={classNames(styles.accordion, {
        [styles.active]: isOpen,
      })}
    >
      <div
        className={classNames(styles.accordionHeader, {
          [styles.active]: isOpen,
        })}
        onClick={onClick}
      >
        <h4>{title}</h4>
        <span
          className={classNames(styles.chevronIcon, {
            [styles.rotate]: isOpen,
          })}
        >
          <Icons.ChevDown />
        </span>
      </div>
      {isOpen && (
        <div className={classNames(styles.accordionContent)}>{children}</div>
      )}
    </div>
  );
};

export default CustomAccordion;
