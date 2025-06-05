"use client";
import { Icons } from "assets";
import classNames from "classnames";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { useRouter } from "next13-progressbar";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { routeConstant } from "routes/constants";

import { convertTime } from "utils/helper";
import CustomToolTip from "../customToolTip";
import EventCard from "../eventCard";
import CustomToolbar from "./customToolbar";
import styles from "./style.module.scss";

interface CustomEvent {
  id: string | any;
  title: string;
  start: Date;
  end: Date;
  slot: string;
}

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CustomCalendarProps {
  events: CustomEvent[];
  toolbar?: JSX.Element;
  defaultView?: string;
  height?: number;
  onViewChange?: (view: keyof typeof Views) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  events,
  defaultView = Views.MONTH,
  height = 600,
}) => {
  const [allEvents, setAllEvents] = useState<CustomEvent[]>(
    events?.map((event: any) => ({
      id: event.id,
      img: event.event_asset.full_path,
      title: event.title,
      start: new Date(
        new Date(event.date).getFullYear(),
        new Date(event.date).getMonth(),
        new Date(event.date).getDate(),
        Number(event.start_time.split(":")[0]),
        Number(event.start_time.split(":")[1])
      ),
      end: new Date(
        new Date(event.date).getFullYear(),
        new Date(event.date).getMonth(),
        new Date(event.date).getDate(),
        Number(event.end_time.split(":")[0]),
        Number(event.end_time.split(":")[1])
      ),
      slot: convertTime(event.start_time, event.end_time),
    }))
  );
  const [currentView, setCurrentView] = useState<string>(defaultView);
  const router = useRouter();

  const handleNavigateEvent = (id: number) => {
    router.push(routeConstant.eventDetail.path.replace(":id", String(id)));
  };

  const handleAdjustEventsResponse = () => {
    let tempEvents = events?.map((event: any) => ({
      id: event.id,
      img: event.event_asset.full_path,
      title: event.title,
      start: new Date(
        new Date(event.date).getFullYear(),
        new Date(event.date).getMonth(),
        new Date(event.date).getDate(),
        Number(event.start_time.split(":")[0]),
        Number(event.start_time.split(":")[1])
      ),
      end: new Date(
        new Date(event.date).getFullYear(),
        new Date(event.date).getMonth(),
        new Date(event.date).getDate(),
        Number(event.end_time.split(":")[0]),
        Number(event.end_time.split(":")[1])
      ),
      slot: convertTime(event.start_time, event.end_time),
    }));

    return tempEvents;
  };

  useEffect(() => {
    setAllEvents(handleAdjustEventsResponse());
  }, [events?.length]);

  return (
    <div className={classNames(styles.container)}>
      <div>
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          // @ts-ignore
          defaultView={currentView as Views}
          components={{
            toolbar: (props) => <CustomToolbar {...props} />,
            // @ts-ignore
            event: ({ event }: CustomEventProps) => (
              <CustomToolTip
                label={
                  <EventCard
                    id={event.id}
                    key={event.id}
                    img={event.img}
                    time={event.slot}
                    title={event.title}
                    desc={event.description}
                    date={event.start}
                    onButtonClick={() => handleNavigateEvent(event.id)}
                  />
                }
                trigger="click"
              >
                <CustomEventComponent
                  event={event}
                  // @ts-ignore
                  view={currentView}
                />
              </CustomToolTip>
            ),
          }}
          style={{ margin: "24px" }}
        />
      </div>
    </div>
  );
};

export default CustomCalendar;

interface CustomEventProps {
  event: any;
  view: "month" | "week" | "day";
}

const CustomEventComponent = ({ event, view }: CustomEventProps) => (
  <div
    className={classNames(
      styles.eventContainer,
      view === "day" && styles.dayViewEvent
    )}
  >
    <div className={styles.eventContent}>
      <div className="flex items-center gap-1 flex-wrap">
        <span>
          <Icons.Clock />
        </span>
        <p>{event.slot}</p>
      </div>
      <h6>{event.title}</h6>
    </div>
  </div>
);
