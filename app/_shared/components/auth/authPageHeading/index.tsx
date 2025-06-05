import classNames from "classnames";
import styles from "./style.module.scss";

interface AuthPageHeadingProps {
  heading: string;
  desc: string;
}

function AuthPageHeading({ heading, desc }: AuthPageHeadingProps) {
  return (
    <div className={classNames(styles.headingContainer)}>
      <h3>{heading}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default AuthPageHeading;
