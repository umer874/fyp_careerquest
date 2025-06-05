import classNames from "classnames";
import styles from "./style.module.scss";

interface CustomCheckboxProps {
  label?: string | any;
  filtersCheckbox?: any;
  type?: string;
  name?: string;
  checked?: boolean;
  onChange?: () => void;
}

const CustomCheckbox = ({
  label,
  filtersCheckbox,
  type = "checkbox",
  name,
  checked = false,
  onChange,
}: CustomCheckboxProps) => {
  return (
    <div className={classNames(styles.checkboxContainer, filtersCheckbox)}>
      <input name={name} type={type} checked={checked} onChange={onChange} />
      <label className={classNames(styles.inputLabel)}>{label}</label>
    </div>
  );
};

export default CustomCheckbox;
