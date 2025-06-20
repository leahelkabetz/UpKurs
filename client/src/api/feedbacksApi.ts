import axios from 'axios';
import { Feedback } from '../models/feedback';

const BASE_URL = 'http://localhost:4000/feedbacks'; // או כל כתובת json-server שלך

export const getFeedbacks = async (): Promise<Feedback[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
