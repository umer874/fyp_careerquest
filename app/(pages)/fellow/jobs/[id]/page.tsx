import JobDetailWrapper from "components/jobDetail/wrapper";
import { GetSingleJobServerCall } from "services/job";

const JobDetail = async ({ params }: any) => {
  const { id } = await params;
  if (!id) return null;
  const data = await GetSingleJobServerCall(id ?? "");
  const job = data?.data;

  return <JobDetailWrapper job={job} noPadding />;
};

export default JobDetail;
