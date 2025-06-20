import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupIcon from '@mui/icons-material/Group';
import HeroSection from './HeroSection';
import { colors, fonts } from '../../styles/theme';

const features = [
  {
    icon: <ComputerIcon fontSize="large" sx={{ color: colors.Primary }} />,
    title: 'למידה מכל מקום',
    description: 'גישה לכל הקורסים מכל מכשיר, בכל זמן ובכל מקום בעולם',
  },
  {
    icon: <AddCircleOutlineIcon fontSize="large" sx={{ color: colors.Primary }} />,
    title: 'תכנים מתעדכנים',
    description: 'הקורסים שלנו מתוכננים באופן קבוע בהתאם לחידושים בתעשייה',
  },
  {
    icon: <GroupIcon fontSize="large" sx={{ color: colors.Primary }} />,
    title: 'קהילה תומכת',
    description: 'הצטרפו לקהילת הלומדים שלנו וקבלו תמיכה מקצועית ממדריכים ומתנדבים',
  },
];

export default function Why() {
  return (
    
    <Box sx={{ backgroundColor: colors.White, fontFamily: fonts.base, direction: 'rtl', mt: 0 , mb: 8  }}>

      <Box sx={{ py: 8, px: 2, textAlign: 'center', direction: 'rtl' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: colors.Primary, fontFamily: fonts.heading }}>
          למה ללמוד אצלנו?
        </Typography>

        {/* <Typography variant="body1" sx={{ color: colors.TextGrPrimaryay, mt: 1 }}>
          הפלטפורמה שלנו מציעה את הכלים הטובים ביותר להתפתחות מקצועית ואישית
        </Typography> */}

        <Grid container spacing={4} justifyContent="center" mt={4}>
          {features.map((feature, index) => (
            <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
              <Card
                elevation={0}
                sx={{
                  border: `1px solid ${colors.AccentLight}`,
                  borderRadius: 3,
                  height: '100%',
                  py: 4,
                  px: 2,
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      backgroundColor: 'transparent',
                      width: 56,
                      height: 56,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: fonts.heading, color: colors.Primary }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.TextGrPrimaryay, mt: 1 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
