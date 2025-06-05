"use server";
import { Icons } from "assets";
import classNames from "classnames";
import BackButton from "components/eventDetail/backButton";
import EventScheduleInfo from "components/eventDetail/info";
import SignUpButton from "components/eventDetail/signupButton";
import Image from "next/image";
import styles from "./style.module.scss";

interface EventDetailWrapperProps {
  event: any;
  noPadding?: boolean;
}

const EventDetailWrapper = async ({
  event,
  noPadding,
}: EventDetailWrapperProps) => {
  return (
    <div className={classNames(!noPadding && styles.eventWrapper)}>
      <div className={classNames(styles.customContainer)}>
        <div className={classNames(styles.eventDetailContainer)}>
          <Image
            width={879}
            height={380}
            src={event?.event_asset?.full_path}
            alt={event.title}
          />
          <EventScheduleInfo event={event} />

          <div className={classNames(styles.heading)}>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
          </div>
          <div className={classNames(styles.eventFeatures)}>
            <h6>What to Expect:</h6>
            <div className={classNames(styles.content)}>
              {event?.expectations?.map((item: any, index: number) => (
                <div
                  key={index}
                  className={classNames(
                    styles.contentItem,
                    "flex items-start gap-2.5"
                  )}
                >
                  <span>
                    <Icons.BulletIcon />
                  </span>
                  <p className={classNames(styles.desc)}>
                    <span className="text-nowrap">
                      {item.title}: {""}
                    </span>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={classNames(styles.eventFeatures)}>
            <h6>Additional Perks:</h6>
            <div className={classNames(styles.content)}>
              {event?.perks?.map((item: string, index: number) => (
                <div
                  key={index}
                  className={classNames(
                    styles.contentItem,
                    "flex items-start gap-2.5"
                  )}
                >
                  <span>
                    <Icons.BulletIcon />
                  </span>
                  <p className={classNames(styles.desc)}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className={classNames(
              styles.backLink,
              "flex flex-col sm:flex-row justify-between gap-3"
            )}
          >
            <BackButton />
            <SignUpButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailWrapper;
