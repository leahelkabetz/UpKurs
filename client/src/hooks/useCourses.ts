import { useEffect, useState, useCallback } from 'react';
import { Course } from '../models/course';
import {
  getCoursesWithRatings,
  getFilteredCourses,
  getAllCategories,
  getPriceRange,
} from '../api/coursesApi';

interface Filters {
  search: string;
  categories: string[];
  priceRange: [number, number];
}

interface UseCoursesOptions {
  topRatedOnly?: boolean;
}

export default function useCourses(options: UseCoursesOptions = {}) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [priceLimits, setPriceLimits] = useState<[number, number]>([0, 1000]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    categories: [],
    priceRange: [0, 1000],
  });

  const pageSize = 20;
  const refreshFilterOptions = useCallback(async () => {
    try {
      const [catRes, priceRes] = await Promise.all([
        getAllCategories(),
        getPriceRange(),
      ]);
      setCategories(catRes.data);
      setPriceLimits([priceRes.data.min, priceRes.data.max]);
      setFilters(prev => ({
        ...prev,
        priceRange: [priceRes.data.min, priceRes.data.max],
      }));
    } catch (err) {
      console.error('שגיאה בטעינת קטגוריות או טווח מחירים:', err);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await refreshFilterOptions(); // ← מרענן קטגוריות וטווח מחירים
      let data: Course[];
      if (options.topRatedOnly) {
        data = await getCoursesWithRatings();
        data = data.filter(c => c.badge === 'פופולרי' || c.badge === 'מומלץ');
      } else {
        data = await getCoursesWithRatings();
      }
      setCourses(data);
      setDisplayedCourses(data.slice(0, pageSize));
      setCurrentIndex(pageSize);
      setHasMore(data.length > pageSize);
    } catch (err: any) {
      setError(err.message || 'שגיאה בטעינה');
    } finally {
      setLoading(false);
    }
  }, [options.topRatedOnly, refreshFilterOptions]);


  const fetchCourses = useCallback(async () => {

    setLoading(true);
    setError(null);
    try {
      let data: Course[];
      if (options.topRatedOnly) {
        data = await getCoursesWithRatings();
        data = data.filter(c => c.badge === 'פופולרי' || c.badge === 'מומלץ');
      } else {
        data = await getCoursesWithRatings();
      }
      console.log('📦 קורסים שהתקבלו מהשרת:', data.map(c => ({ id: c.id, title: c.title })));
      const invalid = data.filter(c => !Number.isFinite(c.id));
      if (invalid.length > 0) {
        console.warn('🚨 קורסים עם id לא חוקי:', invalid);
      }
      setCourses(data);
      setDisplayedCourses(data.slice(0, pageSize));
      setCurrentIndex(pageSize);
      setHasMore(data.length > pageSize);
    } catch (err: any) {
      setError(err.message || 'שגיאה בטעינת קורסים');
    } finally {
      setLoading(false);
    }
  }, [options.topRatedOnly]);

  const loadMore = () => {
    const next = courses.slice(currentIndex, currentIndex + pageSize);
    setDisplayedCourses(prev => [...prev, ...next]);
    setCurrentIndex(currentIndex + pageSize);
    if (currentIndex + pageSize >= courses.length) {
      setHasMore(false);
    }
  };

  const fetchCoursesByFilters = async (filtersToSend = filters) => {
    try {
      const res = await getFilteredCourses(filtersToSend);
      setCourses(res.data);
      setDisplayedCourses(res.data.slice(0, pageSize));
      setCurrentIndex(pageSize);
      setHasMore(res.data.length > pageSize);
    } catch (err) {
      console.error('שגיאה בשליפת קורסים עם סינון:', err);
    }
  };



  const resetFilters = () => {
    const newFilters = {
      search: '',
      categories: [],
      priceRange: priceLimits,
    };
    setFilters(newFilters);
    fetchCoursesByFilters(newFilters);
  };

  const handleFilterChange = (field: string, value: any) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    fetchCoursesByFilters(newFilters);
  };

  useEffect(() => {
    const init = async () => {
      await refreshFilterOptions();
      await fetchCourses();
    };
    init();
  }, [fetchCourses, refreshFilterOptions]);

  return {
    courses,
    displayedCourses,
    loading,
    error,
    hasMore,
    loadMore,
    categories,
    priceLimits,
    filters,
    resetFilters,
    handleFilterChange,
    refresh: refreshAll,
  };
}