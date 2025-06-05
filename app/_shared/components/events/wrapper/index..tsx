"use server";
import { Icons } from "assets";
import classNames from "classnames";
import CustomPageHeader from "components/common/customPageHeader";
import CustomToggleButton from "components/common/customToggleButton";
import NewsLetter from "components/common/newsLetter";
import GridViewEvents from "components/events/gridView";
import { routeConstant } from "routes/constants";
//import { UserType } from "utils/enum";
import CalenderView from "../calendarView";
import styles from "./style.module.scss";

interface EventsWrapperProps {
  response: any;
  viewMode: string;
  isFellow?: boolean;
  noPadding?: boolean;
  user: any;
}

const EventsWrapper = async ({
  response,
  viewMode,
  isFellow,
  noPadding,
  user,
}: EventsWrapperProps) => {
  return (
    <div className={classNames(!noPadding && styles.eventWrapper)}>
      <div className={classNames(styles.customContainer)}>
        {!isFellow ? (
          <CustomPageHeader
            heading={
              <>
                Empower Your Journey: <br /> Events & Opportunities
              </>
            }
            description="Career panels, networking nights, workshops, meetups, and more."
          />
        ) : null}

        <div className={classNames(styles.content)}>
          <div
            className={classNames(
              styles.contentHeader,
              "flex justify-between items-center"
            )}
          >
            <h4>Upcoming Events</h4>
            <div className="flex items-center gap-2">
              <CustomToggleButton
                options={[
                  {
                    id: "grid",
                    icon: <Icons.GridIcon />,
                  },
                  {
                    id: "calendar",
                    icon: <Icons.Calendar2 />,
                  },
                ]}
                defaultSelected={viewMode}
                path={
                  user
                    ? routeConstant.fellow.events.path
                    : routeConstant.events.path
                }
              />
            </div>
          </div>
          {viewMode === "grid" ? (
            <GridViewEvents
              eventsData={response?.data?.data}
              meta={response?.data?.meta}
            />
          ) : (
            <CalenderView events={response?.data} />
          )}
        </div>
        {!isFellow ? (
          <div className="mt-5">
            <NewsLetter />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EventsWrapper;
