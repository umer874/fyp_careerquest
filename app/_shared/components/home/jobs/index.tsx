"use client";

import { Icons } from "assets";
import classNames from "classnames";
import CustomButton from "components/common/customButton";
import CustomSectionHeading from "components/common/customSectionHeading";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next13-progressbar";
import { routeConstant } from "routes/constants";
import styles from "./style.module.scss";
import moment from "moment";
import useWindowDimensions from "hooks/useWindowDimensions";

interface JobsProps {
  jobsData: any[];
}

const Jobs = ({ jobsData }: JobsProps) => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const handleNavigateJobs = () => {
    router.push(routeConstant.insights.path);
  };

  return (
    <section >
      {/* <div className={classNames(styles.customContainer)}>
        <div className={classNames(styles.content)}>
          <CustomSectionHeading
            heading={
              <>
                Explore Your Future: Hands-On <br /> Job Shadow Opportunities
              </>
            }
            description={
              <>
                Connect with experiences that align with your goals to gain
                valuable insights {width > 768 && <br />}into workplace
                environments, job responsibilities, and industry dynamics.
              </>
            }
          />

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 sm:gap-5 xs:gap-4 gap-3">
            {jobsData?.map((items, index) => (
              <Link
                href={routeConstant.jobDetail.path.replace(
                  ":id",
                  String(items.id)
                )}
                key={index}
                className={classNames(styles.jobItem)}
              >
                <div className="flex items-center gap-4">
                  <span className={classNames(styles.iconContainer)}>
                    <Image
                      src={items?.company?.company_asset?.full_path}
                      alt="job-img"
                      height={88}
                      width={88}
                    />
                  </span>
                  <div
                    className={classNames(
                      styles.itemContent,
                      "flex flex-col justify-between h-fit"
                    )}
                  >
                    <div>
                      <div
                        className={classNames(
                          styles.timeStamp,
                          "flex items-center gap-1"
                        )}
                      >
                        <Icons.Clock />
                        <span>{moment(items?.created_at).fromNow()}</span>
                      </div>
                      <h6>{items?.title}</h6>
                      <p>{items?.company?.title}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div
            className={classNames(
              styles.buttonContainer,
              "flex justify-center"
            )}
          >
            <CustomButton
              containerStyle="btn-font-regular"
              title="Browse More"
              onClick={handleNavigateJobs}
            />
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Jobs;
