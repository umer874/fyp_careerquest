"use server";

import classNames from "classnames";
import JobsCTA from "components/job/cta";
import JobsListing from "components/job/listing";
import styles from "./style.module.scss";

interface JobsWrapperProps {
  //response: any;
  noPadding?: boolean;
}

function JobsWrapper({  noPadding }: JobsWrapperProps) {
  return (
    <div className={classNames(!noPadding && styles.jobsWrapper)}>
      <div className={classNames(styles.customContainer)}>
        <JobsCTA />
        <div className={classNames(styles.jobsContainer)}>
          {/* <JobsCTA index={0} /> */}
          {/* <JobsListing
            data={response?.data?.data}
            meta={response?.data?.meta}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default JobsWrapper;
