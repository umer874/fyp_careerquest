import classNames from "classnames";
import styles from "./style.module.scss";

interface CustomSectionHeadingProps {
  heading?: any;
  description?: string | any;
}

const CustomSectionHeading = ({
  heading,
  description,
}: CustomSectionHeadingProps) => {
  return (
    <div>
      <div className={classNames(styles.sectionHeading, "mx-auto")}>
        <h2>{heading}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CustomSectionHeading;
