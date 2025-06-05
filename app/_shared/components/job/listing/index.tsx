"use client";

import JobCard from "components/common/jobCard";
import React, { Fragment, useState } from "react";
import JobsCTA from "../cta";
import CustomButton from "components/common/customButton";
import classNames from "classnames";
import styles from "./style.module.scss";
import { GetJobsService } from "services/job";
import { useRouter } from "next13-progressbar";
import { routeConstant } from "routes/constants";
import { useSelector } from "react-redux";
import { jobs } from "utils/constants";
//import { UserType } from "utils/enum";

interface JobsListingProps {
  data: any[];
  meta: Meta;
}

const JobsListing = ({ data = [], meta }: JobsListingProps) => {
  const {
    auth: { user, isLoggedIn },
  } = useSelector((state: any) => state.root);
  // const [jobs, setJobs] = useState<any[]>(data);
  const [page, setPage] = useState<number>(meta?.currentPage);
  const [totalPages, setTotalPages] = useState<number>(meta?.totalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // const handleGetMoreJobs = async (page: number) => {
  //   setLoading(true);
  //   GetJobsService({ page: page })
  //     .then(({ data: { data }, status }) => {
  //       if (status) {
  //         setJobs([...jobs, ...data?.data]);
  //         setPage(data?.meta?.currentPage);
  //         setTotalPages(data?.meta?.totalPages);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  return (
    <>
      {jobs?.map((item: any, index) => (
        <Fragment key={item?.id}>
          <div className="md:mb-4 mb-3">
            <JobCard
              id={item.id}
              icon={item?.company?.company_asset?.icon}
              timeStamp={item.created_at}
              title={item.title}
              company={item.company?.title}
              desc={item.position_overview}
              onButtonClick={() => {
                if (!isLoggedIn) {
                  router.push(routeConstant.login.path);
                } 
              }}
            />
          </div>
          {/* {(index + 1) % 3 === 0 && <JobsCTA index={(index + 1) / 3} />} */}
        </Fragment>
      ))}
      {page < totalPages ? (
        <CustomButton
          title="+ Show More Results"
          containerStyle={classNames(styles.buttonContainer)}
          onClick={() => {
           
          }}
          loading={loading}
          disabled={loading}
        />
      ) : null}
    </>
  );
};

export default JobsListing;
