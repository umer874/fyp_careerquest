import JobsWrapper from "components/job/wrapper";
import { GetJobsServerCall } from "services/job";

 function Jobs() {
  //const response = await GetJobsServerCall();
  return <JobsWrapper  noPadding />;
}

export default Jobs;
