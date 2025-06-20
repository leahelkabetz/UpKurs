import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { keyframes } from '@emotion/react';
import { colors, fonts } from '../../styles/theme';

// אנימציית ברק צבעוני רכה
const glowText = keyframes`
  0%, 100% {
    color: ${colors.Primary};
    text-shadow: 0 0 6px ${colors.AccentLight};
  }
  50% {
    color: ${colors.AccentLight};
    text-shadow: 0 0 12px ${colors.Primary};
  }
`;

export default function HeroSection() {
  return (
   <Box
  sx={{
    minHeight: '40vh',
    maxHeight:200,
    backgroundColor: colors.White,
    fontFamily: fonts.base,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    direction: 'rtl',
     textAlign: 'center',
     
  }}
>

      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700,
          fontFamily: fonts.heading,
          mb: 1, // פחות מרווח תחתון
        }}
      >
        <Box
          component="span"
          sx={{
            animation: `${glowText} 4s ease-in-out infinite`,
            display: 'inline-block',
          }}
        >
          הדרך שלך
        </Box>{' '}
        להצלחה מקצועית
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: colors.TextGrPrimaryay,
          mt: 1, // פחות מרווח עליון
          maxWidth: 600,
        }}
      >
        קורסים מקצועיים מהמומחים המובילים בתחום, במחירים משתלמים ובנגישות מלאה.
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={5} // פחות רווח בין הכפתורים
        justifyContent="center"
        alignItems="center"
        mt={1} // פחות מרווח עליון
      >
         <Button
                        variant="outlined"
                        onClick={() => {
                            const el = document.getElementById('how-it-works');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        sx={{
                            color: colors.Primary,
                            borderColor: colors.AccentLight,
                            fontWeight: 200,
                            fontFamily: fonts.base,
                            '&:hover': {
                                borderColor: colors.Primary,
                                backgroundColor: '#f5f5f5',
                            },
                        }}
                    >
                        איך זה עובד?
                    </Button>
      </Stack>
    </Box>
  );

}

