import JobsWrapper from "components/job/wrapper";
import { GetJobsServerCall } from "services/job";

async function Jobs() {
  const response = await GetJobsServerCall();
  return <JobsWrapper response={response} />;
}

export default Jobs;
