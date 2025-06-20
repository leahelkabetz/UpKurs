// import React from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Avatar
// } from '@mui/material';
// import ComputerIcon from '@mui/icons-material/Computer';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import GroupIcon from '@mui/icons-material/Group';
// import HeroSection from '../Components/HomePage/HeroSection';
// import { colors, fonts } from '../styles/theme';
// import { WhereToVote } from '@mui/icons-material';
// import Why from '../Components/HomePage/Why';
// import PopularCourses from '../Components/HomePage/PopularCourses';
// import PopularCoursesCarousel from '../Components/HomePage/PopularCourses';



// export default function HomePage() {
//   return (
//     <Box sx={{ backgroundColor: colors.White, minHeight: '100vh', fontFamily: fonts.base }}>
//       <HeroSection />
//       <PopularCoursesCarousel/>
//       <Box sx={{ mt: 0 }}> {/* מרווח קטן מלמעלה */}
//         <Why />
//       </Box>
//     </Box>
//   );
// }
import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../Components/HomePage/HeroSection';
import { colors, fonts } from '../styles/theme';
import Why from '../Components/HomePage/Why';
import PopularCoursesCarousel from '../Components/HomePage/PopularCourses';
import HowItWorks from '../Components/HomePage/HowItWorks';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function HomePage() {
    const username = useSelector((state: RootState) => state.auth.username);
    const password = useSelector((state: RootState) => state.auth.password);

  console.log("Hello",username,"-" ,password)
  return (
    <>
    <Box sx={{ backgroundColor: colors.White, minHeight: '100vh', fontFamily: fonts.base }}>
      <HeroSection />
      <PopularCoursesCarousel />
      <Why />
      <HowItWorks />
    </Box>
    </>
    
  );
}
