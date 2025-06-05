"use client";
import classNames from "classnames";
import styles from "./style.module.scss";

interface SwitchInterface {
  toggle: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
}

function Switch({
  toggle,
  handleChange,
  label,
  disabled = false,
  id,
  name,
  ...rest
}: SwitchInterface) {
  return (
    <div className={classNames(styles["switch-wrapper"])}>
      {label && <span className={classNames(styles.label)}>{label}</span>}
      <label className={classNames(styles.switch)}>
        <input
          type="checkbox"
          checked={toggle}
          onChange={handleChange}
          disabled={disabled}
          id={id}
          name={name}
          {...rest}
        />
        <span
          className={classNames(
            styles.slider,
            styles.round,
            toggle && styles.active
          )}
        ></span>
      </label>
    </div>
  );
}

export default Switch;
