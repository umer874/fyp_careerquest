import { HTTP_METHODS } from "utils/enum";
import { refreshTokenWrapper } from "utils/helper";
import { Endpoint } from "utils/endpoints";

type SubmitAssessmentPayload = {
  userId: string;
  answers: { questionId: string; optionId: string | null }[];
};


export const submitAssessmentService = (payload: SubmitAssessmentPayload) => {
  return refreshTokenWrapper({
    url: Endpoint.assessment.submit,
    method: HTTP_METHODS.POST,
    payload,
  });
};
