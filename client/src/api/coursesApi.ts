import axios from 'axios';
import { Course } from '../models/course';
import { Review } from '../models/review';

const BASE_URL_COURSES = 'http://localhost:4000/courses';

const BASE_URL_REVIEWS = "http://localhost:4000/reviews";

export const getAllProducts = () => axios.get(BASE_URL_COURSES);

export const getProductById = (id: string) => axios.get(`${BASE_URL_COURSES}/${id}`);


export const getMaxCourseId = async () => {
  const res = await axios.get(BASE_URL_COURSES);
  const allIds = res.data.map((c: any) => Number(c.id));
  const maxId = Math.max(...allIds);
  return { data: maxId || 0 };
};

export const addProduct = (product: Course) => axios.post(BASE_URL_COURSES, product);


export const updateProduct = (id: string, updatedProduct: any) =>
  axios.put(`${BASE_URL_COURSES}/${id}`, updatedProduct);

export const deleteProduct = (id: string) => axios.delete(`${BASE_URL_COURSES}/${id}`);

export const getHighRatedCourses = () =>
  axios.get(`${BASE_URL_COURSES}?rating_gte=4`);

export const getTopRatedCourses = () =>
  axios.get(`${BASE_URL_COURSES}?_sort=rating&_order=desc&_limit=10`);

export const getFilteredCourses = (filters: {
  search?: string;
  categories?: string[];
  priceRange?: [number, number];
}) => {
  const params: any = {};

  if (filters.search) {
    params.q = filters.search;
    console.log('🔍 חיפוש חופשי נשלח ב-title_like:', filters.search);
  }

  if (filters.categories?.length) {
    params.category = filters.categories;
    console.log('📁 קטגוריות נשלחות:', filters.categories);
  }

  if (filters.priceRange) {
    params.price_gte = filters.priceRange[0];
    params.price_lte = filters.priceRange[1];
    console.log('💰 טווח מחיר נשלח:', filters.priceRange);
  }

  console.log("📦 כל הפרמטרים שהולכים להישלח:", params);

  return axios.get(BASE_URL_COURSES, {
    params,
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, v));
        } else {
          searchParams.append(key, String(value));
        }
      });
      console.log("🔗 URL הסופי:", searchParams.toString());
      return searchParams.toString();
    },
  });
};

export const getAllCategories = async (): Promise<{ data: string[] }> => {
  const res = await axios.get(BASE_URL_COURSES);
  const allCourses = res.data;

  const uniqueCategories: string[] = Array.from(
    new Set(
      allCourses
        .map((course: any) => course.category)
        .filter((cat: any): cat is string => typeof cat === 'string' && cat.trim() !== '')
    )
  );

  return { data: uniqueCategories };
};

// שליפת טווח המחירים (מינימום ומקסימום)
export const getPriceRange = async () => {
  const res = await axios.get(BASE_URL_COURSES);
  const prices = res.data.map((c: any) => c.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return { data: { min, max } };
};


export const getCoursesWithRatings = async (): Promise<Course[]> => {
  console.log("📡 קורסים מ:", BASE_URL_COURSES);
  console.log("📡 חוות דעת מ:", BASE_URL_REVIEWS);
  const [coursesRes, reviewsRes] = await Promise.all([
    axios.get(BASE_URL_COURSES),
    axios.get(BASE_URL_REVIEWS),
  ]);

  const courses = coursesRes.data;
  const reviews: Review[] = reviewsRes.data;

  return courses.map((course: Course) => {
    const courseReviews = reviews.filter(r => r.courseId === course.id);
    const avgRating = courseReviews.length
      ? courseReviews.reduce((sum, r) => sum + r.rating, 0) / courseReviews.length
      : 0;

    return {
      ...course,
      rating: Number(avgRating.toFixed(1)),
    };
  });
};
