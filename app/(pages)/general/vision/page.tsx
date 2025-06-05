import classNames from "classnames";
import styles from "./style.module.scss";
import CustomPageHeader from "components/common/customPageHeader";

const Vision = () => {
  return (
    <div className={classNames(styles.eventWrapper)}>
      <div className={classNames(styles.customContainer)}>
        <CustomPageHeader
          heading="Vision in Action: A Podcast on Leadership"
          description="Coming Soon..."
        />

        <div
          className={classNames(
            styles.contentContainer,
            "flex flex-col justify-center items-center"
          )}
        >
          <h2>Stay Tuned</h2>
          <h2>Content Coming Soon...</h2>
        </div>
      </div>
    </div>
  );
};

export default Vision;
