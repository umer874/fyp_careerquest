"use client";
import classNames from "classnames";
import { useEffect, useId, useState } from "react";
import OptionsDropDown from "../options";
import styles from "./style.module.scss";
import { Icons } from "assets";
import { getLeftPosition, getTopPosition } from "utils/helper";

interface OptionProps {
  title: string;
  action: (value: any) => void;
  Icon?: JSX.Element;
}

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  error?: string;
  notRequiredMargin?: boolean;
  customLabelStyle?: any;
  customInputContainer?: any;
  customOptionsContainer?: any;
  customIconStyle?: any;
  readOnlyColor?: string;
  options: OptionProps[];
  direction?: "top" | "bottom";
  wrapInGlobalWrapper?: boolean;
}

const CustomDropdown = ({
  label,
  required,
  error,
  value,
  placeholder,
  notRequiredMargin,
  customLabelStyle,
  customInputContainer,
  customOptionsContainer,
  customIconStyle,
  readOnly,
  readOnlyColor,
  options,
  tabIndex,
  direction = "top",
  wrapInGlobalWrapper = true,
}: InputProps) => {
  const [openProfileDropDown, setOpenDropDown] = useState<boolean>(false);
  const uid = useId();

  useEffect(() => {
    if (openProfileDropDown && wrapInGlobalWrapper) {
      const elem = document.getElementById(
        `custom-select-container-${uid}`
      ) as HTMLDivElement;
      const optionsDropDown: HTMLDivElement | null = document.getElementById(
        `custom-select-dropdown-${uid}`
      ) as HTMLDivElement;
      if (elem && optionsDropDown) {
        const topPosition = getTopPosition(elem);
        const leftPosition = getLeftPosition(elem);
        if (direction === "top") {
          optionsDropDown.style.top =
            Number(topPosition + elem?.clientHeight) + "px";
        } else {
          optionsDropDown.style.top =
            Number(topPosition - optionsDropDown?.clientHeight + 20) + "px";
        }

        optionsDropDown.style.left = leftPosition + "px";
        optionsDropDown.style.width = elem?.clientWidth + "px";
      }
    }
    // eslint-disable-next-line
  }, [openProfileDropDown]);

  return (
    <div
      className={classNames(
        "relative w-full",
        notRequiredMargin ? "" : error ? "mb-0" : "mb-3"
      )}
      id={`custom-select-container-${uid}`}
    >
      <div className="flex flex-col items-start w-full gap-2">
        {label ? (
          <label
            className={classNames(
              styles.inputLabel,
              customLabelStyle && customLabelStyle
            )}
          >
            {label} {!!required && <label className={styles.asterik}>*</label>}
          </label>
        ) : null}

        <div
          className={classNames(
            styles.inputContainer,
            readOnly ? styles.readonly : "",
            customInputContainer && customInputContainer,
            "w-full gap-2 cursor-pointer "
          )}
          style={readOnlyColor ? { background: readOnlyColor } : {}}
          onClick={() => {
            setOpenDropDown(true);
          }}
        >
          <span
            className={classNames(value ? styles.value : styles.placeholder)}
          >
            {value ? value : placeholder}
          </span>
          <Icons.ChevDown
            className={classNames(customIconStyle, styles.iconStyle)}
          />
        </div>
        <OptionsDropDown
          id={`custom-select-dropdown-${uid}`}
          options={options}
          openSelection={openProfileDropDown}
          setOpenSelection={setOpenDropDown}
          customContainer={classNames(
            styles.optionsContainer,
            customOptionsContainer
          )}
          tabIndex={tabIndex}
          wrapInGlobalWrapper={wrapInGlobalWrapper}
        />
      </div>
      {!!error && <div className={classNames(styles.error)}>{error}</div>}
    </div>
  );
};

export default CustomDropdown;
