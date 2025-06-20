import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../redux/slices/loadingSlice";
import { colors } from "../styles/theme";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../redux/slices/authSlice";
import { getUserByEmail } from "../api/usersApi";

type LogInFormProps = {
  openRegister: () => void;
};

const LogInForm = ({ openRegister }: LogInFormProps) => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("כתובת אימייל לא תקינה").required("שדה חובה"),
      password: Yup.string().min(8, "סיסמה חייבת להיות לפחות 8 תווים").required("שדה חובה"),
    }),
    onSubmit: async (values) => {
      try {
        setError("");
        dispatch(startLoading());

        const res = await getUserByEmail(values.email);
        const user = res.data[0];

        if (!user) {
          setError("האימייל לא נמצא במערכת");
        } else if (user.password !== values.password) {
          setError("סיסמה שגויה");
        } else {
          dispatch(loginUser({
            id:user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            isAdmin: user.isAdmin,
          }));
          navigate("/");
        }
      } catch (err) {
        setError("שגיאת שרת. יש לנסות במועד מאוחר יותר");
        console.error(err);
      } finally {
        dispatch(stopLoading());
      }
    }
  });

  return (
    <div className="container" style={{ marginTop: 0, paddingTop: 0 }} dir="rtl">
      <div className="row justify-content-center">
        <div
          className="col-12 col-md-8 p-4 rounded"
          style={{
            minWidth: "500px",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label" style={{ color: colors.TextGrPrimaryay }}>
                  אימייל
                </label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </div>

              <div className="col-12 mb-3">
                <label className="form-label" style={{ color: colors.TextGrPrimaryay }}>
                  סיסמה
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""
                      }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#888",
                    }}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>

                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback d-block">{formik.errors.password}</div>
                )}
              </div>

            </div>

            {error && (
              <div className="alert text-center" style={{ color: colors.Error }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-sm"
              style={{
                backgroundColor: colors.Primary,
                color: "#fff",
                fontSize: "1rem",
                width: "200px",
                height: "38px",
                display: "block",
                margin: "0 auto",
                border: "none",
                borderRadius: "6px",
              }}
            >
              התחבר
            </button>
          </form>

          <div className="text-center mt-3">
            <span style={{ color: colors.TextGrPrimaryay }}>אין לך חשבון? </span>
            <button
              className="btn btn-link p-0"
              style={{ color: colors.Primary, textDecoration: "underline", fontWeight: "bold" }}
              onClick={openRegister}
            >
              לחץ כאן
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
