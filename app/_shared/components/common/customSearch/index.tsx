import classNames from "classnames";
import styles from "./style.module.scss";
import { Icons } from "assets";

interface CustomSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const CustomSearch = ({
  placeholder = "Search here",
  value,
  onChange,
}: CustomSearchProps) => {
  return (
    <div className={classNames(styles.searchContainer)}>
      <span className={classNames(styles.iconContainer)}>
        <Icons.Search />
      </span>
      <input
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomSearch;
