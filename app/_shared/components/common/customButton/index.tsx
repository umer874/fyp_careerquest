"use client";
import classNames from "classnames";
import Spinner from "../spinner";
import styles from "./style.module.scss";

interface BtnProps extends React.HTMLProps<HTMLButtonElement> {
  containerStyle: any;
  Icon: any;
  iconStyle: any;
  IconDirection: string;
  disabled?: boolean;
  loading?: boolean;
  titleStyle?: any;
}

const CustomButton = ({
  title,
  onClick,
  containerStyle,
  Icon,
  iconStyle,
  IconDirection,
  disabled,
  style,
  loading,
  titleStyle,
}: Partial<BtnProps>) => {
  const direction = {
    left: "left",
    right: "right",
  };
  return (
    <button
      className={classNames(styles.customBtnContainer, containerStyle)}
      onClick={onClick}
      disabled={disabled}
      type="submit"
      style={style}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {IconDirection === direction.left ? (
            Icon ? (
              <Icon className={iconStyle ? iconStyle : "mr-2"} />
            ) : null
          ) : null}
          <span className={classNames(titleStyle)}>{title}</span>
          {IconDirection === direction.right ? (
            Icon ? (
              <Icon className={iconStyle ? iconStyle : "ml-1"} />
            ) : null
          ) : null}
        </>
      )}
    </button>
  );
};

export default CustomButton;
