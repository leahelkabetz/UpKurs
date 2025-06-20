
// import React from 'react';
// import {
//   Box, TextField, Button, Typography, Paper
// } from '@mui/material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
// import { showMessage } from '../redux/slices/messageSlice';
// import { updateUser } from '../api/usersApi';
// import { useNavigate } from 'react-router-dom';
// import { colors } from '../styles/theme';

// const passwordStrongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

// const validationSchema = Yup.object({
//   name: Yup.string().required('שדה חובה'),
//   email: Yup.string().email('אימייל לא תקין').required('שדה חובה'),
//   newPassword: Yup.string()
//     .required("שדה חובה")
//     .matches(passwordStrongRegex, "הסיסמה חייבת לכלול לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד"),
// });

// export default function UserProfileEditor() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const userId = useSelector((state: RootState) => state.auth.id) || '';
//   const userName = useSelector((state: RootState) => state.auth.username) || '';
//   const userEmail = useSelector((state: RootState) => state.auth.email) || '';
//   const userPassword = useSelector((state: RootState) => state.auth.password) || '';

//   const formik = useFormik({
//     initialValues: {
//       name: userName,
//       email: userEmail,
//       newPassword: '',
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const updatedData = {
//           username: values.name,
//           email: values.email,
//           password: values.newPassword || userPassword,
//         };

//         await updateUser(userId, updatedData);
//         dispatch(showMessage({ type: 'success', text: 'הפרטים עודכנו בהצלחה' }));
//         navigate('/');
//       } catch (err) {
//         dispatch(showMessage({ type: 'error', text: 'שגיאה בעדכון הפרטים' }));
//         console.error(err);
//       }
//     },
//     enableReinitialize: true,
//   });

//   return (
//     <Paper
//       elevation={4}
//       sx={{
//         maxWidth: 480,
//         mx: 'auto',
//         mt: 6,
//         p: 4,
//         borderRadius: 3,
//         direction: 'rtl',
//         fontFamily: 'inherit',
//       }}
//     >
//       <Typography variant="h5" fontWeight="bold" mb={3} color={colors.Primary}>
//         עדכון פרטי משתמש
//       </Typography>
//       <form onSubmit={formik.handleSubmit}>
//         {[
//           { name: 'name', placeholder: userName, type: 'text' },
//           { name: 'email', placeholder: userEmail, type: 'email' },
//           { name: 'newPassword', placeholder: 'סיסמה חדשה', type: 'password' }
//         ].map(({ name, placeholder, type }) => (
//           <TextField
//             key={name}
//             fullWidth
//             name={name}
//             placeholder={placeholder}
//             type={type}
//             value={formik.values[name as keyof typeof formik.values]}
//             onChange={formik.handleChange}
//             error={formik.touched[name as keyof typeof formik.touched] && Boolean(formik.errors[name as keyof typeof formik.errors])}
//             helperText={formik.touched[name as keyof typeof formik.touched] && formik.errors[name as keyof typeof formik.errors]}
//             variant="outlined"
//             sx={{
//               mb: 2,
//               backgroundColor: '#f9f9f9',
//               borderRadius: 1,
//               '& input': {
//                 textAlign: 'right',
//                 fontWeight: 500,
//               },
//             }}
//           />
//         ))}

//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{
//             mt: 2,
//             backgroundColor: colors.Primary,
//             color: '#fff',
//             fontWeight: 'bold',
//             '&:hover': {
//               backgroundColor: colors.Primary || '#0288d1',
//             },
//           }}
//         >
//           שמור שינויים
//         </Button>
//       </form>
//     </Paper>
//   );
// }
import React from 'react';
import {
  TextField, Button, Typography, Paper
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { showMessage } from '../redux/slices/messageSlice';
import { updateUser } from '../api/usersApi';
import { useNavigate } from 'react-router-dom';
import { colors } from '../styles/theme';

const passwordStrongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const validationSchema = Yup.object({
  name: Yup.string().required('שדה חובה'),
  email: Yup.string().email('אימייל לא תקין').required('שדה חובה'),
  newPassword: Yup.string()
    .required("שדה חובה")
    .matches(passwordStrongRegex, "הסיסמה חייבת לכלול לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד"),
});

export default function UserProfileEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state: RootState) => state.auth.id) || '';
  const userName = useSelector((state: RootState) => state.auth.username) || '';
  const userEmail = useSelector((state: RootState) => state.auth.email) || '';
  const userPassword = useSelector((state: RootState) => state.auth.password) || '';

  const formik = useFormik({
    initialValues: {
      name: userName,
      email: userEmail,
      newPassword: userPassword,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const updatedData = {
          username: values.name,
          email: values.email,
          password: values.newPassword || userPassword,
        };

        await updateUser(userId, updatedData);
        dispatch(showMessage({ type: 'success', text: 'הפרטים עודכנו בהצלחה' }));
        navigate('/');
      } catch (err) {
        dispatch(showMessage({ type: 'error', text: 'שגיאה בעדכון הפרטים' }));
        console.error(err);
      }
    },
    enableReinitialize: true,
  });

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 480,
        mx: 'auto',
        mt: 6,
        p: 4,
        borderRadius: 3,
        direction: 'rtl',
        fontFamily: 'inherit',
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={3} color={colors.Primary}>
        עדכון פרטי משתמש
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* שם מלא */}
        <TextField
          fullWidth
          name="name"
          placeholder={userName}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant="outlined"
          sx={{
            mb: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: 1,
            '& input': { textAlign: 'right', fontWeight: 500 },
          }}
        />

        {/* אימייל */}
        <TextField
          fullWidth
          name="email"
          placeholder={userEmail}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant="outlined"
          sx={{
            mb: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: 1,
            '& input': { textAlign: 'right', fontWeight: 500 },
          }}
        />

        {/* סיסמה חדשה */}
        <TextField
          fullWidth
          name="newPassword"
          type="password"
          placeholder={userPassword ? `•••••• (${userPassword})` : 'סיסמה חדשה'}
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
          variant="outlined"
          sx={{
            mb: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: 1,
            '& input': { textAlign: 'right', fontWeight: 500 },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: colors.Primary,
            color: '#fff',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: colors.Primary,
            },
          }}
        >
          שמור שינויים
        </Button>
      </form>
    </Paper>
  );
}
