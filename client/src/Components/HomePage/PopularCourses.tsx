import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import CourseCard from '../CourseCard';
import useCourses from '../../hooks/useCourses';
import { fonts } from '../../styles/theme';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  rtl: true,
  arrows: true,
  swipeToSlide: true,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 3 } },
    { breakpoint: 960, settings: { slidesToShow: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 1 } },
  ],
};

export default function PopularCoursesCarousel() {
  const { courses, refresh } = useCourses({ topRatedOnly: true });

  return (
    <Box sx={{ px: 2, py: 1, direction: 'rtl', mt: 0, mb: 8 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        fontFamily={fonts.heading}
        mb={3}
        sx={{ textAlign: 'right' }}
      >
        הקורסים המובילים
      </Typography>

      <Slider {...settings}>
        {courses.map((c) => (
          <Box key={c.id} sx={{ px: 1, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: 350, width: '100%' }}>
              <CourseCard
                course={c}
                onDeleted={refresh}
                onEdited={refresh}
                onReviews={refresh}
                onRefreshPopular={refresh}
                refreshPopular={refresh}
              />
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
