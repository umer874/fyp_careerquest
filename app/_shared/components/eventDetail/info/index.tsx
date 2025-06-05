"use client";
import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import { Icons } from "assets";
import moment from "moment";
import { convertTime } from "utils/helper";

const EventScheduleInfo = ({ event }: any) => {
  const eventScheduleData = [
    {
      icon: <Icons.Calendar />,
      title: moment(event.date).format("MMMM DD, YYYY"),
    },
    {
      icon: <Icons.Clock />,
      title: convertTime(event?.start_time, event?.end_time),
    },
    { icon: <Icons.LocationPin />, title: event?.address },
  ];

  return (
    <div
      className={classNames(
        styles.timeVenue,
        "flex items-center xs:gap-4 gap-2 flex-wrap"
      )}
    >
      {eventScheduleData.map((data, index) => (
        <div
          key={index}
          className={classNames(
            styles.iconContainer,
            "flex items-center xs:gap-2 gap-1"
          )}
        >
          <span>{data.icon}</span>
          <p>{data.title}</p>
        </div>
      ))}
    </div>
  );
};

export default EventScheduleInfo;
