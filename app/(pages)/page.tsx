import Wrapper from "../_shared/components/common/wrapper";
import Events from "components/home/events";
import HeroBanner from "components/home/heroBanner";
import HowItWorks from "components/home/howItWorks";
import Jobs from "components/home/jobs";
import WorkSteps from "components/home/workSteps";
import { HomePageServerCall } from "services/general";
import { GetCookieUser } from "utils/server-side-helper";

export default async function Home() {
  const user = await GetCookieUser();
  const { jobs, events } = await HomePageServerCall();

  return (
    <>
      <Wrapper user={user}>
        <HeroBanner />
        <WorkSteps />
        <HowItWorks />
        {jobs?.data?.data?.length > 0 ? (
          <Jobs jobsData={jobs?.data?.data} />
        ) : null}
        {/* {events?.data?.data?.length > 0 ? (
          <Events eventsData={events?.data?.data} />
        ) : null} */}
      </Wrapper>
    </>
  );
}
