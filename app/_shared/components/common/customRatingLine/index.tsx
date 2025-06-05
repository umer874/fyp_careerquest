import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

type RatingLineProps = {
  ratingValue: number;
  ratingNumber: string;
};

const RatingLine = ({ ratingValue, ratingNumber }: RatingLineProps) => {
  const lineWidth =
    ratingValue === 0 ? "0%" : `${Math.min(Math.max(ratingValue, 1), 5) * 20}%`;

  return (
    <div className={classNames(styles.ratingLineContainer)}>
      <span className={classNames(styles.ratingLabel, "w-1/12")}>
        {ratingNumber}
      </span>
      <div className={classNames(styles.ratingLineWrapper, "w-11/12")}>
        <div className={styles.ratingLine} style={{ width: lineWidth }} />
      </div>
    </div>
  );
};

export default RatingLine;
