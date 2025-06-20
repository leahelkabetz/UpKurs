import React, { useEffect } from 'react';
import { Box, Typography, Container, Divider, Paper } from '@mui/material';
import { colors, fonts } from '../styles/theme';

const AboutPage = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{ py: 6, fontFamily: fonts.base, direction: 'rtl' }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: colors.Primary }}>
          עלינו – איך הכל התחיל
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <img
            src="https://www.yaniv-arad.com/wp-content/uploads/2020/07/Depositphotos_172385004_l-2015-1.jpg"
            alt="איור שולחן עבודה מקצועי"
            style={{ width: 200, height: 'auto', marginLeft: 16, borderRadius: 8 }}
          />
          <Typography variant="body1"sx={{ fontSize: '1.1rem' }}>
            שמי דניאל כהן, ובמשך יותר מעשור הייתי מרצה לפיתוח תוכנה ומנטור באקדמיה. במהלך השנים שמתי לב לתופעה שחוזרת על עצמה:
            סטודנטים מסיימים קורסים תיאורטיים, אך כשהם מגיעים לראיונות – חסר להם משהו. הביטחון. הפרקטיקה. החיבור האמיתי לתעשייה.
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 3,fontSize: '1.1rem'  }}>
          התחושה הזו ליוותה אותי לאורך זמן – יש פער. בין מה שנלמד, לבין מה שנדרש באמת.
          לכן הקמתי את <strong>Upkurs</strong>: פלטפורמה דיגיטלית ללימודים מקצועיים, בגישה אחרת.
          עם קורסים שנכתבים מהשטח, ליווי אישי, וגישה שמאפשרת לכל אחד ללמוד – מתי שנוח לו, בקצב שלו.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
          למה הקמנו את Upkurs?
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 ,fontSize: '1.1rem' }}>
          ✔ כי נמאס מקורסים תיאורטיים בלבד  
          <br />
          ✔ כי צריך ללמוד איפה שרוצים, מתי שרוצים  
          <br />
          ✔ כי כל אחד יכול להתקדם – גם בלי תואר  
          <br />
          ✔ כי הצלחה מקצועית לא אמורה להיות יקרה או מסובכת  
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
          מה תמצאו אצלנו?
        </Typography>

        <Typography variant="body1" sx={{ mb: 3,fontSize: '1.1rem'  }}>
          ✦ קורסים פרקטיים שמבוססים על ניסיון אמיתי  
          <br />
          ✦ מערכי שיעור ברורים, ליווי ותמיכה  
          <br />
          ✦ תעודת סיום שמבוססת על יכולת ולא על שעות  
          <br />
          ✦ קהילה מקצועית תומכת שתלך איתך כל הדרך  
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
          החזון שלנו
        </Typography>

        <Typography variant="body1" sx={{fontSize: '1.1rem' }}>
          להנגיש ידע מקצועי ואיכותי, שמוביל להזדמנויות אמיתיות בתעשייה.
          לכל אחד ואחת, מכל מקום, בכל שלב. אם יש לך רצון – אנחנו נדאג לכל השאר.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
