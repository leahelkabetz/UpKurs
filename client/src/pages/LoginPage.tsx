import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../Components/LogInForm";
import { Box, Typography } from "@mui/material";

type LoginPageProps = {
  openRegister: () => void;
};

const LoginPage = ({ openRegister }: LoginPageProps) => {
  return (
    <div>
      <div style={{ height: "100vh", overflow: "hidden" }}>
        <Container fluid className="p-0 h-100" dir="rtl">
          <Row className="h-100 m-0">
            <Col
              md={6}
              style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <img
                src="https://www.yaniv-arad.com/wp-content/uploads/2020/07/Depositphotos_172385004_l-2015-1.jpg"
                alt="טכנולוגיה"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* שכבת הטשטוש בצד שמאל */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "200px", // רוחב רחב יותר
                  background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0) 100%)",

                }}
              ></div>
            </Col>

            <Col
              md={5}
              xs={12}
              className="d-flex align-items-center justify-content-center p-4"
              style={{
                backgroundColor: "#ffffff",
                height: "100vh",
              }}
            >
              <div style={{ maxWidth: 360, width: "100%" }}>
                <LoginForm openRegister={openRegister} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Box
        component="footer"
        sx={{
          textAlign: 'center',
          padding: 2,
          background: '#f5f5f5',
          borderTop: '1px solid #ddd',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 | UpKurs - Learn. Grow. Achieve. | Developed by Leah Elkabetz
        </Typography>
      </Box>
    </div>
  );
};

export default LoginPage;
