import { Box, Typography, Paper } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { colors } from "../styles/theme";

const PayPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        backgroundColor: "#f5f5f5",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          textAlign: "center",
          borderRadius: 3,
          maxWidth: 500,
          backgroundColor: "#fff",
          border: `2px solid ${colors.Primary}`,
        }}
      >
        <ErrorOutlineIcon
          sx={{ fontSize: 50, color: colors.Primary, mb: 2 }}
        />
        <Typography variant="h5" fontWeight="bold" color={colors.Primary} mb={1}>
          שגיאה בהשלמת ההזמנה
        </Typography>
        <Typography variant="body1" color="text.secondary">
          .עקב תקלה, נציגנו יצרו איתך קשר בימים הקרובים להשלמת ההזמנה
        </Typography>
      </Paper>
    </Box>
  );
};

export default PayPage;
