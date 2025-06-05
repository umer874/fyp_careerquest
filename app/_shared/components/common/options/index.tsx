"use client";
import classNames from "classnames";
import { useEffect, useId } from "react";
import GlobalWrapper from "../globalWrapper";
import styles from "./style.module.scss";

interface OptionsDropDownProps {
  id?: string;
  openSelection: boolean;
  setOpenSelection: (val: boolean) => void;
  options: OptionProps[];
  customContainer: any;
  customLabelStyle?: any;
  tabIndex?: number;
  activeItem?: string;
  wrapInGlobalWrapper?: boolean;
  title: string;
  Icon?: JSX.Element;
  action: (value: any) => void;
}

const OptionsDropDown = ({
  id,
  openSelection,
  setOpenSelection,
  options,
  customContainer,
  tabIndex,
  activeItem,
  customLabelStyle,
  wrapInGlobalWrapper = false,
}: Partial<OptionsDropDownProps>) => {
  const udid = useId();
  function handleClick(e: any) {
    const elem: any = document.getElementById(
      id ? id : `optionsDropDownContainer-${udid}`
    );
    if (elem) {
      if (!elem?.contains(e.target)) {
        setOpenSelection?.(false);
      }
    }
  }

  useEffect(() => {
    function handleClick(event: any) {
      const elem = document.getElementById(
        id ? id : `optionsDropDownContainer-${udid}`
      );
      if (elem && !elem.contains(event.target)) {
        setOpenSelection?.(false);
      }
    }

    document.body.addEventListener("click", handleClick, true);

    return () => {
      document.body.removeEventListener("click", handleClick, true);
    };
  }, [id, setOpenSelection]);

  useEffect(() => {
    document.body.addEventListener(
      "click",
      (event: any) => {
        handleClick(event);
      },
      true
    );

    return () => {
      document.body.removeEventListener(
        "click",
        (event: any) => {
          handleClick(event);
        },
        true
      );
    };
    // eslint-disable-next-line
  }, []);

  if (wrapInGlobalWrapper) {
    return openSelection ? (
      <GlobalWrapper>
        <div
          className={classNames(
            styles.optionsContainer,
            customContainer && customContainer,
            openSelection && "open"
          )}
          id={id ? id : `optionsDropDownContainer-${udid}`}
        >
          {options?.map(
            (
              Item: {
                title: string;
                Icon?: any;
                action: (arg: any) => any;
              },
              inx: number
            ) => {
              return (
                <div
                  className={classNames(
                    styles.options_item,
                    "flex items-center gap-2",
                    styles.optionContainer,
                    inx === options?.length - 1 && styles.btmradius,
                    inx === 0 && styles.topradius,
                    activeItem === Item.title && styles.activeItem
                  )}
                  style={
                    inx === options?.length - 1 ? { borderBottom: "0px" } : {}
                  }
                  onClick={() => {
                    if (tabIndex || tabIndex === 0) {
                      Item.action(tabIndex);
                    } else {
                      Item.action(Item.title);
                    }
                    setOpenSelection?.(false);
                  }}
                  key={inx}
                  role="button"
                >
                  {Item?.Icon ? (
                    <Item.Icon className={classNames(styles.iconStyle)} />
                  ) : null}
                  <label
                    className={classNames(styles.labelStyle)}
                    role="button"
                  >
                    {Item?.title}
                  </label>
                </div>
              );
            }
          )}
        </div>
      </GlobalWrapper>
    ) : null;
  } else {
    return (
      <div
        className={classNames(
          styles.optionsContainer,
          customContainer && customContainer,
          openSelection
        )}
        id={id ? id : `optionsDropDownContainer-${udid}`}
        style={
          openSelection ? { visibility: "visible" } : { visibility: "hidden" }
        }
      >
        {options?.map(
          (
            Item: {
              title: string;
              Icon?: any;
              action: (arg: any) => any;
            },
            inx: number
          ) => {
            return (
              <div
                className={classNames(
                  "flex items-center gap-2",
                  styles.optionContainer,
                  inx === options?.length - 1 && styles.btmradius,
                  inx === 0 && styles.topradius,
                  activeItem === Item.title && styles.activeItem
                )}
                style={
                  inx === options?.length - 1 ? { borderBottom: "0px" } : {}
                }
                onClick={() => {
                  if (tabIndex || tabIndex === 0) {
                    Item.action(tabIndex);
                  } else {
                    Item.action(Item.title);
                  }
                  setOpenSelection?.(false);
                }}
                key={inx}
                role="button"
              >
                {Item?.Icon ? (
                  <Item.Icon className={classNames(styles.iconStyle)} />
                ) : null}
                <label
                  className={classNames(styles.labelStyle, customLabelStyle)}
                  role="button"
                >
                  {Item?.title}
                </label>
              </div>
            );
          }
        )}
      </div>
    );
  }
};

export default OptionsDropDown;
