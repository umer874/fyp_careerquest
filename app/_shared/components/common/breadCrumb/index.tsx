"use client";
import { useSelector } from "react-redux";
import styles from "./style.module.scss";
import classNames from "classnames";
import dynamic from "next/dynamic";

const BreadCrumb = () => {
  const crumbs = useSelector((state: any) => state.breadcrumb?.crumbs || []);


  return (
    <div className="flex items-center">
      {crumbs?.map(
        (item: { title: string; action?: () => void }, indx: number) => (
          <div key={indx} className={classNames("flex items-center")}>
            <div
              className={
                crumbs.length === 1
                  ? styles.breadCrumbActive
                  : indx < crumbs.length - 1
                  ? styles.breadCrumbDefault
                  : styles.breadCrumbActive
              }
              onClick={item?.action}
              role="button"
            >
              <h6>{item?.title}</h6>
            </div>
            {crumbs.length - 1 > indx && (
              <span className={styles.breadCrumbSeparator}>{" >> "}</span>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(BreadCrumb), {
  ssr: false,
});

// export default BreadCrumb;
