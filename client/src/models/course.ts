
export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  students: number;
  rating: number;
  badge: string | null; // 
  image: string;
}