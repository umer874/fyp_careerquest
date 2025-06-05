"use client";
import classNames from "classnames";
import CustomSectionHeading from "components/common/customSectionHeading";
import EventCard from "components/common/eventCard";
import { useRouter } from "next13-progressbar";
import { routeConstant } from "routes/constants";
import styles from "./style.module.scss";
import { convertTime } from "utils/helper";
import CustomButton from "components/common/customButton";

interface EventsProps {
  eventsData: any[];
}

const Events = ({ eventsData }: EventsProps) => {
  const router = useRouter();
  const handleNavigateAllEvents = () => {
    router.push(routeConstant.events.path);
  };

  const handleNavigateEvent = (id: number) => {
    router.push(routeConstant.eventDetail.path.replace(":id", String(id)));
  };

  const handleNavigateJobs = () => {
    router.push(routeConstant.events.path);
  };

  return (
    <section className={classNames(styles.sectionContainer)}>
      <div className={classNames(styles.customContainer)}>
        <div className={classNames(styles.content)}>
          <CustomSectionHeading
            heading="Events to Boost Your Career"
            description="Connect with resources that align with your ambitions"
          />
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-7 sm:gap-5 gap-4">
            {eventsData?.slice(0, 6).map((items, index) => (
              <EventCard
                id={items.id}
                key={index}
                img={items?.event_asset?.full_path}
                time={convertTime(items?.start_time, items?.end_time)}
                title={items?.title}
                desc={items?.description}
                date={items.date}
                onButtonClick={() => handleNavigateEvent(items.id)}
              />
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
      </div>
    </section>
  );
};

export default Events;
