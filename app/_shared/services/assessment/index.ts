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
  const response = await axios.post(`${BaseURL}${Endpoint.assessment.submit}`, data);
  return response.data; // Return the actual response data
};
