"use client";
import classNames from "classnames";
import styles from "./style.module.scss";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Icons } from "assets";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  error: string | any;
  name?: string;
  notRequiredMargin?: boolean;
  customLabelStyle: any;
  customInputStyle: any;
  customInputContainer: any;
  customIconStyle: any;
  isPassword: boolean;
  Icon: any;
  isDate: boolean;
  isNumber?: boolean;
  formikKey?: string;
  setFieldValue?: (val: any, val2: any) => void;
  IconDirection: string;
  handleIconClick?: () => void;
  readOnlyColor?: string;
}

const CustomInput: ForwardRefRenderFunction<any, Partial<InputProps>> = (
  {
    label,
    required,
    error,
    value,
    placeholder,
    type,
    name,
    onChange,
    notRequiredMargin,
    onKeyDown,
    customLabelStyle,
    customInputStyle,
    customInputContainer,
    customIconStyle,
    isPassword,
    readOnly,
    Icon,
    onPaste,
    isDate,
    defaultValue,
    min,
    IconDirection = "left",
    handleIconClick,
    readOnlyColor,
    id,
  },
  ref
) => {
  const [inputType, setInputType] = useState<string>(type ? type : "");
  const [inputValue, setInputValue] = useState<any>(value ? value : "");
  const dateRef: any = useRef(null);
  const [width, setWidth] = useState<number | undefined>(0);
  const direction = {
    left: "left",
    right: "right",
  };

  const handleResizeObserver = () => {
    const elem = document.getElementById("input-container");
    setWidth(elem?.clientWidth ? elem?.clientWidth : 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    let topElem: any = document.getElementById("input-container");
    const observer: any = new ResizeObserver(handleResizeObserver).observe(
      topElem
    );
    return () => {
      observer?.unobserve(topElem);
    };
  }, []);
  return (
    <div
      className={classNames(
        "relative w-full",
        notRequiredMargin ? "" : error ? "mb-0" : "mb-3"
      )}
    >
      <div className="flex flex-col items-start w-full gap-2">
        {label ? (
          <label
            className={classNames(
              styles.inputLabel,
              customLabelStyle && customLabelStyle
            )}
          >
            {label}{" "}
            {!!required && (
              <label className={classNames(styles.asterik)}>*</label>
            )}
          </label>
        ) : null}

        <div
          className={classNames(
            styles.inputContainer,
            "gap-2",
            readOnly ? styles.readonly : "",
            customInputContainer && customInputContainer,
            "w-full"
          )}
          style={readOnlyColor ? { background: readOnlyColor } : {}}
          id="input-container"
        >
          {IconDirection === direction.left ? (
            Icon ? (
              <Icon
                onClick={handleIconClick}
                className={classNames(customIconStyle, styles.iconStyle)}
              />
            ) : null
          ) : null}

          {!!isDate ? (
            <>
              <div className={`${styles.dateInputToggle}`}>
                <label
                  htmlFor="dateInput"
                  role={"button"}
                  className={`${styles.dateInputToggleButton}`}
                />

                <input
                  defaultValue={defaultValue}
                  type={type}
                  id="dateInput"
                  name="dateInput"
                  disabled={readOnly}
                  placeholder={placeholder}
                  className={`${styles.dateInputStyle}`}
                  value={value}
                  ref={dateRef}
                  onChange={onChange}
                  min={min}
                />
              </div>
              <div className="flex items-center w-full">
                {/* <Icons.Calendar /> */}
                <input
                  defaultValue={defaultValue}
                  type={"text"}
                  disabled={readOnly}
                  placeholder={placeholder}
                  className={`${styles.date_disable_cursor} ${styles.inputStyle} ${styles.dateInputTextStyle}`}
                  value={value}
                  onClick={() => {
                    dateRef.current.showPicker();
                  }}
                  readOnly
                />
              </div>
            </>
          ) : (
            <input
              id={id}
              name={name}
              ref={ref}
              defaultValue={defaultValue}
              type={inputType}
              placeholder={placeholder}
              className={classNames(
                styles.inputStyle,
                customInputStyle,
                readOnly ? styles.readonly : ""
              )}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={onKeyDown}
              readOnly={readOnly}
              onPaste={onPaste}
            />
          )}
          {isPassword &&
            (inputType === "password" ? (
              <Icons.EyeDisable
                role="button"
                onClick={() => setInputType("text")}
                className={classNames(styles.iconStyleEye)}
              />
            ) : (
              <Icons.Eye
                role="button"
                onClick={() => setInputType("password")}
                className={classNames(styles.iconStyleEye)}
              />
            ))}
          {IconDirection === direction.right ? (
            Icon ? (
              <Icon
                onClick={handleIconClick}
                className={classNames(customIconStyle, styles.iconStyle)}
              />
            ) : null
          ) : null}
        </div>
      </div>
      {!!error && (
        <div className={classNames(styles.error)} style={{ maxWidth: width }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default forwardRef(CustomInput);
