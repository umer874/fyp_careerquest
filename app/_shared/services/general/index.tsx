import { BaseURL, Endpoint } from "utils/endpoints";
import { HTTP_CLIENT } from "utils/interceptor";

const ContactUsService = (payload: ContactUs) => {
  return HTTP_CLIENT.post(Endpoint.general.contactUs, payload);
};

const HomePageServerCall = async () => {
  try {
    const [jobsRes, eventsRes] = await Promise.all([
      fetch(BaseURL + Endpoint.job.get + "?limit=6", {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }),
      fetch(BaseURL + Endpoint.event.get + "?limit=6", {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }),
    ]);

    const [jobs, events] = await Promise.all([
      jobsRes.json(),
      eventsRes.json(),
    ]);

    return {
      jobs,
      events,
    };
  } catch (error) {
    return {
      jobs: {
        data: {
          data: [],
        },
      },
      events: {
        data: {
          data: [],
        },
      },
    };
  }
};

export { ContactUsService, HomePageServerCall };
