import axios from "axios";
import { BaseURL, Endpoint } from "utils/endpoints";

export const submitAssessmentService = async (data: {
  userId: string;
  answers: { questionId: string; optionId: string }[];
}) => {
  const response = await axios.post(`${BaseURL}${Endpoint.assessment.submit}`, data);
  return response.data;
};
