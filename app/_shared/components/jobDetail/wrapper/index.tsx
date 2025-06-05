"use server";
import { Icons } from "assets";
import classNames from "classnames";
import ApplyJobButton from "components/jobDetail/applyButton";
import BackButton from "components/jobDetail/backButton";
import Image from "next/image";
import styles from "./style.module.scss";

interface JobDetailProps {
  job: any;
  noPadding?: boolean;
}

const JobDetailWrapper = async ({ job, noPadding }: JobDetailProps) => {
  return (
    <>
      <div className={classNames(!noPadding && styles.eventWrapper)}>
        <div className={classNames(styles.customContainer)}>
          <div className={classNames(styles.eventDetailContainer)}>
            <div
              className={classNames(
                styles.cardContent,
                "flex sm:flex-row flex-col sm:justify-between items-center"
              )}
            >
              <div className="flex items-center gap-3">
                <Image
                  width={68}
                  height={68}
                  src={job?.company?.company_asset?.full_path}
                  alt="company-logo"
                />
                <div>
                  <div
                    className={classNames(
                      styles.title,
                      "flex items-start gap-2"
                    )}
                  >
                    <h6>{job?.title}</h6>
                  </div>
                  <p className={classNames(styles.company)}>
                    {job?.company?.title}
                  </p>
                </div>
              </div>
              <div
                className={classNames(styles.buttonContainer, "sm:mt-0 mt-4")}
              >
                <ApplyJobButton company={job?.company?.title} id={job?.id} />
              </div>
            </div>
            <div className={classNames(styles.eventFeatures)}>
              <h6>Position Overview</h6>
              <div className={classNames(styles.content)}>
                <p>{job?.position_overview}</p>
              </div>
            </div>
            <div className={classNames(styles.eventFeatures)}>
              <h6>Contact Information:</h6>
              <div
                className={classNames(
                  styles.content,
                  "flex items-center gap-1"
                )}
              >
                <span>
                  <Icons.Email />
                </span>
                <p>{job?.contact_info}</p>
              </div>
            </div>
            <div className={classNames(styles.eventFeatures)}>
              <h6>Skills Needed</h6>
              <div className={classNames(styles.content)}>
                {job?.skills_needed?.map((item: string, index: number) => (
                  <div
                    key={index}
                    className={classNames(
                      styles.contentItem,
                      "flex items-start gap-2.5 mb-2"
                    )}
                  >
                    <span>
                      <Icons.BulletArrowsIcon />
                    </span>
                    <p className={classNames(styles.desc)}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={classNames(styles.eventFeatures)}>
              <h6>Requirement of Position</h6>
              <div className={classNames(styles.content)}>
                {job?.requirements?.map((item: string, index: number) => (
                  <div
                    key={index}
                    className={classNames(
                      styles.contentItem,
                      "flex items-start gap-2.5 mb-2"
                    )}
                  >
                    <span>
                      <Icons.BulletArrowsIcon />
                    </span>
                    <p className={classNames(styles.desc)}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={classNames(
                styles.backLink,
                "flex items-center justify-between"
              )}
            >
              <BackButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailWrapper;
