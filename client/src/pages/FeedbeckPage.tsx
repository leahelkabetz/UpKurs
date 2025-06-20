// import React from 'react';
// import {
//   Box, Typography, Avatar, Paper, Fade
// } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import { colors } from '../styles/theme';
// import Grid from '@mui/material/Grid'; // נכון

// const feedbacks = [
//   {
//     name: "רוני כהן",
//     school: "מכללת הנדסאים תל אביב",
//     image: "https://randomuser.me/api/portraits/women/65.jpg",
//     feedback: "הקורסים היו מעולים, ההסברים ברורים והתרגולים חיזקו לי את הביטחון. ממליצה בחום!",
//   },
//   {
//     name: "דוד לוי",
//     school: "הטכניון",
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//     feedback: "למדתי כל כך הרבה והצלחתי להשתלב בעבודה מיד בסיום הקורס. תודה!",
//   },
//   {
//     name: "הדס אליהו",
//     school: "המכללה האקדמית ירושלים",
//     image: "https://randomuser.me/api/portraits/women/12.jpg",
//     feedback: "אווירה לימודית טובה, צוות מרצים מצוין ותוכן לימוד מעודכן – פשוט מושלם!",
//   },
// ];

// export default function FeedbeckPage() {
//   const theme = useTheme();

//   return (
//     <Box sx={{ px: 4, py: 6, direction: 'rtl', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
//       <Typography variant="h4" fontWeight="bold" textAlign="center" color={colors.Primary} mb={5}>
//         מה אומרים הסטודנטים שלנו?
//       </Typography>
//       <Grid container spacing={4} justifyContent="center">
//         {feedbacks.map((item, idx) => (
// <Box
//   sx={{
//     display: "grid",
//     gridTemplateColumns: {
//       xs: "1fr",     // מסך קטן – טור אחד
//       sm: "1fr 1fr", // בינוני – שני טורים
//       md: "1fr 1fr 1fr", // גדול – שלושה טורים
//     },
//     gap: 4,
//     justifyItems: "center",
//   }}
// >
//   {feedbacks.map((item, idx) => (
//     <Fade in timeout={1000} key={idx}>
//       <Paper
//         elevation={4}
//         sx={{
//           p: 3,
//           borderRadius: 3,
//           backgroundColor: '#ffffff',
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           textAlign: 'center',
//           transition: 'transform 0.3s',
//           width: '100%',
//           maxWidth: 350,
//           '&:hover': {
//             transform: 'scale(1.02)',
//           },
//         }}
//       >
//         <Avatar src={item.image} sx={{ width: 80, height: 80, mb: 2 }} />
//         <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
//         <Typography variant="body2" color="text.secondary" mb={2}>
//           {item.school}
//         </Typography>
//         <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
//           “{item.feedback}”
//         </Typography>
//       </Paper>
//     </Fade>
//   ))}
// </Box>
//         ))}
//       </Grid>
//     </Box>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { Fade } from '@mui/material';
import { colors } from '../styles/theme';
import { getFeedbacks } from '../api/feedbacksApi';


export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getFeedbacks();
        console.log(res);

        setFeedbacks(res);
      } catch (error) {
        console.error("בעיה בשליפת ההמלצות", error);
      }
    };
    fetch();
  }, []);

  return (
    <Box sx={{ px: 4, py: 6, direction: 'rtl'}}>
      <Typography variant="h4" fontWeight="bold" color={colors.Primary} textAlign="center" mb={5}>
        למה סטודנטים אוהבים אותנו?
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        {feedbacks.map((item, idx) => (
          <Fade in key={idx} timeout={600 + idx * 200}>
            <Paper
              elevation={3}
              sx={{
                width: 320,
                p: 3,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                position: 'relative',
              }}
            >
              <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                "{item.feedback}"
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                <Avatar
                  src={item.image}
                  alt={item.name}
                  sx={{ width: 56, height: 56, ml: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.school}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Fade>
        ))}
      </Box>
    </Box>
  );
}
