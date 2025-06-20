
import React from 'react';
import { Box, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { colors, fonts } from '../../styles/theme';

import EmailIcon from '@mui/icons-material/Email';

const steps = [
  {
    icon: <SchoolIcon fontSize="medium" />,
    title: 'בחירת הקורס המתאים לך',
  },
  {
    icon: <EmailIcon fontSize="medium" />,
    title: 'שליחת גישה ישירות למייל',
  },
  {
    icon: <MenuBookIcon fontSize="medium" />,
    title: 'למידה גמישה בקצב שלך',
  },
  {
    icon: <WorkspacePremiumIcon fontSize="medium" />,
    title: 'קבלת תעודת סיום מקצועית',
  },
];

export default function HowItWorks() {
  return (
    <Box
      id="how-it-works"
      sx={{
        px: 2,
        py: 8,
        textAlign: 'center',
        direction: 'rtl',
        fontFamily: fonts.base,
        backgroundColor: colors.White,
        mb: 8,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        fontFamily={fonts.heading}
        sx={{ color: colors.Primary, mb: 6 }}
      >
        איך זה עובד?
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 900,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* קו מחבר בין העיגולים */}
        <Box
          sx={{
            position: 'absolute',
            top: 28,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: colors.AccentLight,
            zIndex: 0,
          }}
        />

        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              zIndex: 1,
              flex: 1,
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: colors.Primary,
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
              }}
            >
              {step.icon}
            </Box>
            <Typography
              variant="body2"
              sx={{ mt: 1, fontWeight: 500, fontFamily: fonts.heading }}
            >
              {step.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
