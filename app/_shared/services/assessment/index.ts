import axios from "axios";
import { BaseURL, Endpoint } from "utils/endpoints";

// services/assessment.ts
export const submitAssessmentService = async (data: {
  userId: string;
  answers: Array<{
    questionId: number; // Not string/_id
    optionId: string;
  }>;
}) => {
  return axios.post(`${BaseURL}${Endpoint.assessment.submit}`, data);
};
