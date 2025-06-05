"use client";

import { useState } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import EventCard from "components/common/eventCard";
import CustomPagination from "components/common/customPagination";
import { useRouter } from "next13-progressbar";
import { routeConstant } from "routes/constants";
import { convertTime } from "utils/helper";
import { GetEventsService } from "services/event";
import { useSelector } from "react-redux";
//import { UserType } from "utils/enum";

interface GridViewEventsProps {
  eventsData: any[];
  meta: Meta;
}

const GridViewEvents = ({ eventsData = [], meta }: GridViewEventsProps) => {
  const { auth } = useSelector((state: any) => state.root);
  const router = useRouter();
  const [events, setEvents] = useState<any[]>(eventsData);
  const [page, setPage] = useState<number>(meta?.currentPage);
  const [totalItems, setTotalItems] = useState<number>(meta?.totalItems);

  const handleGetEvents = async (page: number) => {
    GetEventsService({ page: page, limit: 9 })
      .then(({ data: { data }, status }) => {
        if (status) {
          setEvents(data?.data);
          setTotalItems(data?.meta?.totalItems);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNavigateEvent = (id: number) => {
    if (auth) {
      router.push(routeConstant.eventDetail.path.replace(":id", String(id)));
    } else {
      router.push(
        routeConstant.fellow.eventsDetail.path.replace(":id", String(id))
      );
    }
  };

  return (
    <>
      <div
        className={classNames(
          styles.gridContainer,
          "grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-7 sm:gap-5 gap-4"
        )}
      >
        {events?.map((item) => (
          <EventCard
            id={item?.id}
            key={item?.id}
            img={item?.event_asset?.full_path}
            time={convertTime(item?.start_time, item?.end_time)}
            title={item?.title}
            desc={item?.description}
            date={item?.date}
            onButtonClick={() => handleNavigateEvent(item?.id)}
          />
        ))}
      </div>
      {eventsData?.length > 0 ? (
        <div className={classNames(styles.paginationContainer)}>
          <CustomPagination
            disablePaginationInfo
            onPageChange={(page) => {
              setPage(page);
              handleGetEvents(page);
            }}
            totalCount={totalItems}
            currentPage={page}
            pageSize={10}
          />
        </div>
      ) : null}
    </>
  );
};

export default GridViewEvents;
