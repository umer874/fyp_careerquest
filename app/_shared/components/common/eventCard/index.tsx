"use client";
import classNames from "classnames";
import styles from "./style.module.scss";
import Image, { StaticImageData } from "next/image";
import { Icons } from "assets";
import CustomButton from "components/common/customButton";
import moment from "moment";

type EventCardProps = {
  id: string | any;
  img: StaticImageData | string;
  time: string;
  title: string;
  desc: string;
  date: string;
  onButtonClick?: () => void;
};

const EventCard = ({
  id,
  img,
  time,
  title,
  desc,
  date,
  onButtonClick,
}: EventCardProps) => {
  return (
    <div className={classNames(styles.eventItem, "flex flex-col")}>
      <Image width={418} height={200} src={img} alt="event-img" />

      <div className={classNames("flex flex-col justify-between h-full")}>
        <div className={classNames(styles.cardContent)}>
          <div className={classNames(styles.itemContent)}>
            <div className={classNames(styles.date, "flex items-center gap-2")}>
              <Icons.Calendar3 />
              <span>
                {moment(date).format("DD MMMM, YYYY")} | {time}
              </span>
            </div>
            <div className={classNames(styles.title, "flex items-start gap-2")}>
              <h6>{title}</h6>
            </div>
            <p>{desc}</p>
          </div>
        </div>
        <div className={classNames(styles.buttonContainer)}>
          <CustomButton
            containerStyle="bg-blue w-full"
            title="View Detail"
            onClick={onButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
