import { BaseURL, Endpoint } from "utils/endpoints";
import { HTTP_CLIENT } from "utils/interceptor";

const GetEventsService = ({ page, limit, search }: ListingInterface) => {
  return HTTP_CLIENT.get(
    Endpoint.event.get +
      `?${page ? `page=${page}&` : ""}${limit ? `limit=${limit}&` : ""}${
        search ? `search=${search}&` : ""
      }`
  );
};

const GetEventsServerCall = async () => {
  try {
    const res = await fetch(BaseURL + Endpoint.event.get + "?limit=9", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return {
      data: {
        data: [],
        meta: {
          total: 0,
          page: 1,
          limit: 10,
        },
      },
    };
  }
};

interface GetEventsForCalendarServerCallProps {
  start_date?: string;
  end_date?: string;
}

const GetEventsForCalendarServerCall = async ({
  start_date,
  end_date,
}: GetEventsForCalendarServerCallProps) => {
  try {
    const res = await fetch(
      BaseURL +
        Endpoint.event.getEventforCalendar +
        `${start_date ? `?start_date=${start_date}` : ""}${
          end_date ? `&end_date=${end_date}` : ""
        }`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    return {
      data: [],
    };
  }
};

const GetEventsForCalendarService = ({
  start_date,
  end_date,
}: GetEventsForCalendarServerCallProps) => {
  return HTTP_CLIENT.get(
    Endpoint.event.getEventforCalendar +
      `?start_date=${start_date}${end_date ? `&end_date=${end_date}` : ""}`
  );
};

const GetSingleEventServerCall = async (id: string) => {
  try {
    const res = await fetch(
      BaseURL + Endpoint.event.getEventDetail.replace(":id", id),
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    return {
      data: null,
    };
  }
};

export {
  GetEventsService,
  GetEventsServerCall,
  GetSingleEventServerCall,
  GetEventsForCalendarServerCall,
  GetEventsForCalendarService,
};
