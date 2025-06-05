"use client";
import classNames from "classnames";
import styles from "./style.module.scss";
import Image, { StaticImageData } from "next/image";
import CustomButton from "components/common/customButton";
import Link from "next/link";
import moment from "moment";
import { routeConstant } from "routes/constants";
import { useSelector } from "react-redux";
//import { UserType } from "utils/enum";

type JobCardProps = {
  id: string | any;
  icon: StaticImageData | string;
  timeStamp: string;
  title: string;
  company: string;
  desc: string;
  onButtonClick?: () => void;
};

const JobCard = ({
  id,
  icon,
  timeStamp,
  title,
  company,
  desc,
  onButtonClick,
}: JobCardProps) => {
  const { auth } = useSelector((state: any) => state.root);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <Link
      href={
        routeConstant.jobDetail.path.replace(":id", id)
      }
    >
      <div className={classNames(styles.eventItem)}>
        <div
          className={classNames(
            styles.cardContent,
            "flex sm:flex-row flex-col sm:justify-between items-center"
          )}
        >
          <div className="flex items-center gap-3">
            <Image width={68} height={68} src={icon} alt="company-logo" />
            <div>
              <div
                className={classNames(styles.title, "flex items-start gap-2")}
              >
                <h6>{title}</h6>
                <span>{moment(timeStamp).fromNow()}</span>
              </div>
              <p className={classNames(styles.company)}> {company}</p>
            </div>
          </div>
          <div className={classNames(styles.buttonContainer, "sm:mt-0 mt-4")}>
            <CustomButton
              title="Apply Now"
              containerStyle="w-full"
              //onClick={}
            />
          </div>
        </div>
        <div className={classNames(styles.itemContent)}>
          <p>{desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
