import classNames from "classnames";
import styles from "./style.module.scss";
import CustomSectionHeading from "../customSectionHeading";

interface CustomPageHeaderProps {
  heading: string | any;
  description: string | any;
  isContactHeader?: boolean;
}

const CustomPageHeader = ({
  heading,
  description,
  isContactHeader = false,
}: CustomPageHeaderProps) => {
  return (
    <div className={classNames(styles.pageHeader, "mx-auto")}>
      <CustomSectionHeading heading={heading} description={description} />
      {isContactHeader && (
        <p className={classNames(styles.email)}>
          info@careerquesthelp@gmail.com
        </p>
      )}
    </div>
  );
};

export default CustomPageHeader;
