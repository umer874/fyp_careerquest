import { BaseURL, Endpoint } from "utils/endpoints";
import { HTTP_METHODS } from "utils/enum";
import { refreshTokenWrapper } from "utils/helper";
import { HTTP_CLIENT } from "utils/interceptor";

const GetJobsService = ({ page, limit, search }: ListingInterface) => {
  return HTTP_CLIENT.get(
    Endpoint.job.get +
      `?${page ? `page=${page}&` : ""}${limit ? `limit=${limit}&` : ""}${
        search ? `search=${search}&` : ""
      }`
  );
};

const GetJobsServerCall = async () => {
  try {
    const res = await fetch(BaseURL + Endpoint.job.get, {
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

const GetSingleJobServerCall = async (id: string) => {
  try {
    const res = await fetch(
      BaseURL + Endpoint.job.getJobDetail.replace(":id", id),
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

const ApplyJobService = (payload: any, id: string) => {
  return refreshTokenWrapper({
    url: Endpoint.job.applyJob.replace(":id", id),
    method: HTTP_METHODS.POST,
    payload,
  });
};

export {
  GetJobsService,
  GetJobsServerCall,
  GetSingleJobServerCall,
  ApplyJobService,
};
