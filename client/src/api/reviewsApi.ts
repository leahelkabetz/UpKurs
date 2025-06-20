import axios from 'axios';
import { getAllUsers } from './usersApi';
import { Review, ReviewWithUserName } from '../models/review';
import { User } from '../models/user';

const BASE_URL_REVIEWS = 'http://localhost:4000/reviews';

export const getAllReviews=()=>axios.get(BASE_URL_REVIEWS);

export const getReviewsById=(id:number)=>axios.get(`${BASE_URL_REVIEWS}/${id}`);

export const addReviews=(reviews:any)=>axios.post(BASE_URL_REVIEWS, reviews);

export const updateReviews = (id:number, updatedReviews:any) =>
  axios.put(`${BASE_URL_REVIEWS}/${id}`, updatedReviews);



export const getReviewsByCourseId = async (courseId: string) => {
  try {
    const res = await axios.get(BASE_URL_REVIEWS, {
      params: { courseId },
    });
    return res.data; // מערך של חוות דעת
  } catch (error) {
    console.error("שגיאה בשליפת חוות דעת:", error);
    return [];
  }
};

export const getReviewsWithUserNames = async (courseId: string): Promise<ReviewWithUserName[]> => {
  try {
    const [reviews, usersRes] = await Promise.all([
      getReviewsByCourseId(courseId),
      getAllUsers()
    ]);

    const users = usersRes.data;

    return reviews.map((review: Review) => {
      const user = users.find((u: User) => u.id === review.userId);
      return {
        ...review,
        userName: user?.username || "משתמש לא ידוע"
      };
    });

  } catch (err) {
    console.error("שגיאה בשליפה:", err);
    return [];
  }
};
export const deleteReview = async (reviewId: string) => {
  return await axios.delete(`${BASE_URL_REVIEWS}/${reviewId}`);
};
