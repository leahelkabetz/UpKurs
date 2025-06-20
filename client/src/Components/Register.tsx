import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { colors } from "../styles/theme";
import { addUsers, getUserByEmail } from "../api/usersApi";
import { useDispatch } from 'react-redux';
import { showMessage } from '../redux/slices/messageSlice';
type RegisterProps = {
  show: boolean;
  onClose: () => void;
};

const passwordStrongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const Register = ({ show, onClose }: RegisterProps) => {
  const [success, setSuccess] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("שדה חובה"),
      email: Yup.string().email("כתובת אימייל לא תקינה").required("שדה חובה"),
      password: Yup.string()
        .required("שדה חובה")
        .matches(
          passwordStrongRegex,
          "הסיסמה חייבת לכלול לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד"
        ),
      confirmPassword: Yup.string()
        .required("יש לאשר סיסמה")
        .oneOf([Yup.ref("password")], "הסיסמאות אינן תואמות"),
    }),


    onSubmit: async (values, { resetForm }) => {
      try {
        // בדיקת מייל קיים
        const { data: users } = await getUserByEmail(values.email);
        if (users.length > 0) {
          dispatch(showMessage({ type: 'error', text: 'המייל כבר קיים במערכת' }));
          setSuccess(true);
          resetForm();
          setShowConfirm(false);
          setShowPassword(false);
          setTimeout(() => {
            setSuccess(false);
            onClose();
            navigate('/login');
          }, 3500);
          return;
        }
        // רישום משתמש חדש
        await addUsers({ ...values, isAdmin: false });

        dispatch(showMessage({ type: 'success', text:'נרשמת בהצלחה, שמחים שהצטרפת אלינו :)' }));
        setSuccess(true);
        resetForm();
        setShowConfirm(false);
        setShowPassword(false);
        setTimeout(() => {
          setSuccess(false);
          onClose();
          navigate('/login');
        }, 3500);
      } catch (error) {
        console.error("שגיאה ברישום:", error);
        dispatch(showMessage({ type: 'error', text: 'שגיאה ברישום' }));
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3500);
      }
    }
  });

  // איפוס כל השדות בלחיצה על ביטול
  const handleCancel = () => {
    formik.resetForm();
    setShowConfirm(false);
    setShowPassword(false);
    onClose();
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal-backdrop-blur"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(4px)",
          zIndex: 1040,
        }}
        onClick={handleCancel}
      />
      <div
        className="modal d-block"
        tabIndex={-1}
        style={{
          background: "transparent",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1050,
          display: "flex",
          justifyContent: "center",
          direction: "rtl",
          minHeight: "100vh",
          alignItems: "flex-start",
          marginTop: "80px",
        }}
      >
        <div className="modal-dialog" style={{ minWidth: 350, direction: "rtl" }}>
          <div className="modal-content" dir="rtl">
            <div className="modal-header">
              <h5 className="modal-title w-100 text-center">הרשמה</h5>
              <button type="button" className="btn-close" onClick={handleCancel}></button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="modal-body">
                <div className="mb-3 text-end">
                  <label className="form-label">שם מלא</label>
                  <input
                    type="text"
                    name="username"
                    className={`form-control ${formik.touched.username && formik.errors.username ? "is-invalid" : ""}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="invalid-feedback d-block">{formik.errors.username}</div>
                  )}
                </div>
                <div className="mb-3 text-end">
                  <label className="form-label">אימייל</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback d-block">{formik.errors.email}</div>
                  )}
                </div>
                <div className="mb-3 text-end">
                  <label className="form-label">סיסמה</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
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
                        color: "#888"
                      }}
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback d-block">{formik.errors.password}</div>
                  )}
                  <div className="form-text text-end" style={{ fontSize: "0.85rem" }}>
                    הסיסמה חייבת לכלול לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד
                  </div>
                </div>
                <div className="mb-3 text-end">
                  <label className="form-label">אימות סיסמה</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      onPaste={e => e.preventDefault()} // מונע הדבקה
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#888"
                      }}
                      onClick={() => setShowConfirm((v) => !v)}
                    >
                      {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="invalid-feedback d-block">{formik.errors.confirmPassword}</div>
                  )}
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  ביטול
                </button>
                <button type="submit" className="btn" style={{ background: colors.Primary, color: colors.White }}>
                  הרשמה
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;




