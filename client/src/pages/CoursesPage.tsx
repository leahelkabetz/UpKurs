
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import InfiniteScroll from 'react-infinite-scroll-component';
import CourseCard from '../Components/CourseCard';
import AddCourseDialog from '../Components/AddCourseDialog';
import FilterSidebar from '../Components/FilterSidebar';
import { colors, fonts } from '../styles/theme';
import useCourses from '../hooks/useCourses';
import { showMessage } from '../redux/slices/messageSlice';

const CoursesPage: React.FC = () => {
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const {
    courses,
    displayedCourses,
    hasMore,
    loadMore,
    categories,
    priceLimits,
    filters,
    resetFilters,
    handleFilterChange,
    refresh,
  } = useCourses({ topRatedOnly: false });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', px: 2, mt: 10, mb: 5 }}>
      <FilterSidebar
        filters={filters}
        categories={categories}
        priceLimits={priceLimits}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      <InfiniteScroll
        dataLength={displayedCourses.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Typography textAlign="center" mt={2}>טוען עוד קורסים...</Typography>}
        style={{ overflow: 'visible', width: '100%' }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {isAdmin && (
            <AddCourseDialog onCourseAdded={refresh} />
          )}

          {displayedCourses.map((c, i) => (
            <Box
              key={c.id}
              sx={{
                width: { xs: '100%', sm: '45%', md: '30%', lg: '22%' },
                minWidth: 250,
              }}
            >
              <CourseCard
                course={c}
                onDeleted={refresh}
                onEdited={refresh}
                onReviews={refresh}
              />
            </Box>
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default CoursesPage;
