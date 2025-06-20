export interface Review {
id: string;
  courseId: string;
  userId: string;
  rating: number;
  comment: string;
}
export interface ReviewWithUserName extends Review {
  userName: string;
}
