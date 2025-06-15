import { HTTP_METHODS } from "utils/enum";
import { refreshTokenWrapper } from "utils/helper";
import { Endpoint } from "utils/endpoints";

interface AssessmentPayload {
  userId: string;
  match: string;
}

export const submitAssessmentService = (payload: AssessmentPayload) => {
  return refreshTokenWrapper({
    url: Endpoint.assessment.submit,
    method: HTTP_METHODS.POST,
    payload,
  });
};
