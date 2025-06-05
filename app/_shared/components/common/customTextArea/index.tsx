"use client";
import classNames from "classnames";
import styles from "./style.module.scss";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  required: boolean;
  error: string;
  placeholder: string;
  onChange: any;
  customLabelStyle: any;
  customInputStyle: any;
  customInputContainer: any;
  limit?: number;
  showLimit?: boolean;
  rows?: number;
}

const CustomTextArea = ({
  label,
  required,
  error,
  value,
  placeholder,
  onChange,
  customLabelStyle,
  customInputStyle,
  customInputContainer,
  limit,
  showLimit,
  rows,
}: Partial<InputProps>) => {
  const charLimit = limit ? limit : 3000;
  return (
    <div className={classNames("relative w-full", error ? "mb-0" : "mb-3")}>
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
            customInputContainer && customInputContainer,
            styles.inputContainer,
            "w-full"
          )}
        >
          <textarea
            rows={rows}
            onChange={onChange}
            placeholder={placeholder}
            className={classNames(
              styles.inputStyle,
              customInputStyle && customInputStyle
            )}
            value={value}
          />
        </div>
      </div>
      {!!error ? (
        <div className={styles.error}>{error}</div>
      ) : showLimit ? (
        <label className={classNames(styles.lmtLabel)}>
          {Number(charLimit - String(value).length)} character left
        </label>
      ) : null}
    </div>
  );
};

export default CustomTextArea;
