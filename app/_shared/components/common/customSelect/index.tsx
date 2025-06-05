"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { Icons } from "assets";
import classNames from "classnames";

interface OptionProps {
  title: string;
  action: () => void;
}

interface CustomSelectProps {
  label?: string;
  selectedItem?: string | any;
  enableSortSelect?: boolean;
  enableCalendarSelect?: boolean;
  required?: boolean;
  options: OptionProps[];
  defaultActiveItem?: string;
  activeItem?: string;
  customDropdownMenu?: string;
  customSelectWrapper?: string;
  customSortStyle?: string;
  enableIconTrigger?: boolean;
  onChange?: (selected: string) => void | any;
  error?: string;
}

const CustomSelect = ({
  options,
  label,
  required,
  customSortStyle,
  customDropdownMenu,
  customSelectWrapper,
  enableSortSelect = false,
  enableCalendarSelect = false,
  defaultActiveItem = "Featured",
  activeItem: externalActiveItem,
  enableIconTrigger = false,
  onChange,
  error,
}: CustomSelectProps) => {
  const [openSelection, setOpenSelection] = useState(false);
  const [activeItem, setActiveItem] = useState(defaultActiveItem);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalActiveItem) {
      setActiveItem(externalActiveItem);
    }
  }, [externalActiveItem]);

  const handleOptionClick = (title: string, action: () => void) => {
    setActiveItem(title);
    if (onChange) {
      onChange(title);
    }
    action();
    setOpenSelection(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenSelection(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className={classNames(
        styles.selectWrapper,
        customSelectWrapper,
        "flex flex-col gap-2 items-start justify-center"
      )}
      ref={dropdownRef}
    >
      {label && (
        <label className={styles.inputLabel}>
          {label}{" "}
          {!!required && (
            <label className={classNames(styles.asterik)}>*</label>
          )}
        </label>
      )}
      <div
        className={classNames(styles.sortContainer, customSortStyle, "w-full")}
      >
        <div
          className={classNames(
            styles.sortLabel,
            "flex items-center justify-between cursor-pointer"
          )}
          onClick={() => setOpenSelection(!openSelection)}
        >
          {enableSortSelect ? (
            <span className="flex items-center justify-between w-full gap-1">
              Sort by: {activeItem}
              <Icons.ChevDown />
            </span>
          ) : (
            <>
              {enableIconTrigger ? (
                <div className={classNames(styles.triggerIcon)}>
                  <Icons.VerticalDots />
                </div>
              ) : (
                <div className="flex items-center justify-between w-full gap-2">
                  <span className={classNames(styles.activeItem)}>
                    {activeItem}
                  </span>
                  {enableCalendarSelect ? (
                    <span className={classNames(styles.chevDownFilled)}>
                      <Icons.ChevDownFilled />
                    </span>
                  ) : (
                    <Icons.ChevDown />
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {openSelection && (
          <div className={classNames(styles.dropdown, customDropdownMenu)}>
            {options.map((option) => (
              <div
                key={option.title}
                className={classNames(styles.optionItem, {
                  [styles.active]: option.title === activeItem,
                })}
                onClick={() => handleOptionClick(option.title, option.action)}
              >
                {option.title}
              </div>
            ))}
          </div>
        )}
      </div>
      {!!error && <div className="error">{error}</div>}
    </div>
  );
};

export default CustomSelect;
