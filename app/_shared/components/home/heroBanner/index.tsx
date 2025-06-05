import { Icons } from "assets";
import classNames from "classnames";
import styles from "./style.module.scss";

const HeroBanner = () => {
  return (
    <section className={classNames(styles.sectionContainer)}>
      <div
        className={classNames(
          styles.customContainer,
          "flex sm:flex-row flex-col sm:justify-between justify-center items-end gap-6 h-full"
        )}
      >
        <div className={classNames(styles.content)}>
          <div className="">
            <h1 className={classNames(styles.title)}>
              Ready to pursue your dreams?
            </h1>
            <p>
              We support Boys & Girls  ages 18–24 in building job and career pathways through
               personalized assessments, expert coaching, and tailored job recommendations.
            </p>
          </div>
        </div>
        <div
          className={classNames(
            styles.rightSideContent,
            "flex flex-col xs:items-start items-center gap-6"
          )}
        >
          {/* <Icons.ChatQuotesIcon /> */}
          <p>
            Community is more than just sharing resources or hanging out now and
            then. It’s showing up and investing in the ongoing creation of one
            another’s lives.
          </p>
          <p>- Bill Burnett</p>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
