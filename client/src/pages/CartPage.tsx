
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, clearCart } from "../redux/slices/cartSlice";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from 'react-icons/fa';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { colors, fonts } from '../styles/theme';

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.course.price, 0),
    [cartItems]
  );

  return (
    <Container className="mt-5" dir="rtl">

      {cartItems.length === 0 ? (
        <p className="text-center">העגלה ריקה</p>
      ) : (
        <>
          <Row className="gy-4">
            {cartItems.map((item) => (
              <Col key={item.course.id} xs={12}>
                <Card className="shadow-sm d-flex flex-row align-items-center p-2">
                  <Image
                    src={item.course.image||"https://www.nakarmedic.co.il/wp-content/uploads/2022/04/top-6-eLearning-trends-of-2019.jpg"}
                    rounded
                    height={80}
                    width={80}
                    style={{ objectFit: "cover" }}
                    className="me-3"
                  />
                  <div className="flex-grow-1" style={{ marginRight: 15 }}>
                    <h5 className="mb-1">{item.course.title}</h5>
                    <p className="mb-1 text-muted">קטגוריה: {item.course.category}</p>
                    <p className="mb-1 fw-bold">מחיר: ₪{item.course.price}</p>
                  </div>

                  <IconButton onClick={() => dispatch(removeFromCart(item.course.id))}><DeleteIcon color="error" /></IconButton>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <h4 className="mb-3">סה"כ לתשלום: ₪{total}</h4>

            <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap" dir="rtl">
              <Button
                variant="success"
                className="ms-2"
                onClick={() => navigate("/topay")}
              >
                מעבר לתשלום
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => dispatch(clearCart())}
              >
                נקה עגלה
              </Button>

              <Button
                variant="link"
                onClick={() => navigate("/courses")}
                style={{ color: colors.Primary, textDecoration: "underline", fontWeight: "500" }}
              >
                ← המשך לקנות
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
