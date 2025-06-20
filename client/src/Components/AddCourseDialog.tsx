import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Fab,
    Tooltip,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { colors } from '../styles/theme';
import { addProduct, getMaxCourseId } from '../api/coursesApi';
import { showMessage } from '../redux/slices/messageSlice';
import { useDispatch } from 'react-redux';

type Props = {
    onCourseAdded: () => void;
};

type CourseForm = {
    title: string;
    description: string;
    category: string;
    price: string;
    badge: string;
};

const AddCourseDialog: React.FC<Props> = ({ onCourseAdded }) => {
    const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

    const formik = useFormik<CourseForm>({
        initialValues: {
            title: '',
            description: '',
            category: '',
            price: '',
            badge: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .test('not-only-numbers', 'הכותרת לא יכולה להכיל רק מספרים', value => isNaN(Number(value)))
                .required('שדה חובה'),
            description: Yup.string()
                .test('not-only-numbers', 'התיאור לא יכול להכיל רק מספרים', value => isNaN(Number(value)))
                .required('שדה חובה'),
            category: Yup.string()
                .test('not-only-numbers', 'הקטגוריה לא יכולה להכיל רק מספרים', value => isNaN(Number(value)))
                .required('שדה חובה'),
            price: Yup.number()
                .typeError('חייב להיות מספר')
                .min(0, 'לא ניתן להזין ערך שלילי')
                .required('שדה חובה'),
        }),
        onSubmit: async (values) => {
            try {
                const maxIdRes = await getMaxCourseId();
                const _id = String(maxIdRes.data + 1);

                await addProduct({
                    id: _id,
                    title: values.title,
                    category: values.category,
                    description: values.description,
                    price: Number(values.price),
                    students: 0,
                    rating: 0,
                    badge: values.badge || null,
                    image: "https://example.com/images/course_97.jpg"
                });

                onCourseAdded();
                setOpen(false);
                formik.resetForm();
            dispatch(showMessage({ type: 'success', text: 'הקורס נוסף בהצלחה' }));
            } catch (err) {
             dispatch(showMessage({ type: 'error', text: 'שגיאה בהוספת הקורס' }));
                console.error('שגיאה בהוספת קורס:', err);
            }
        },
    });

    return (
        <>
            <Tooltip title="הוסף קורס">
                <Fab
                    onClick={() => setOpen(true)}
                    color="primary"
                    sx={{
                        position: 'fixed',
                        bottom: 40,
                        left: 40,
                        backgroundColor: colors.Primary,
                        '&:hover': { backgroundColor: colors.AccentLight },
                        zIndex: 1000
                    }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

            <Dialog open={open} onClose={() => setOpen(false)} dir="rtl">
                <DialogTitle>הוספת קורס</DialogTitle>
                <form onSubmit={formik.handleSubmit} dir="rtl">
                    <DialogContent>
                        {(['title', 'description', 'category', 'price'] as (keyof CourseForm)[]).map((field) => (
                            <TextField
                                key={field}
                                name={field}
                                placeholder={
                                    field === 'title' ? 'כותרת הקורס' :
                                        field === 'description' ? 'תיאור הקורס' :
                                            field === 'category' ? 'קטגוריה' :
                                                'מחיר'
                                }
                                type={field === 'price' ? 'number' : 'text'}
                                fullWidth
                                sx={{ my: 1 }}
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[field] && Boolean(formik.errors[field])}
                                helperText={formik.touched[field] && formik.errors[field]}
                                inputProps={{ dir: 'rtl' }}
                                FormHelperTextProps={{
                                    sx: {
                                        textAlign: 'right',
                                        direction: 'rtl',
                                        fontSize: '0.85rem',
                                        fontFamily: 'inherit'
                                    }
                                }}
                            />
                        ))}

                        {/* בחירת תגית (badge) */}
                        <FormControl fullWidth sx={{ my: 1 }}>
                            {/* <InputLabel id="badge-label" sx={{ right: 25, left: 'auto' }}>תגית</InputLabel> */}
                            <Select
                                labelId="badge-label"
                                id="badge"
                                name="badge"
                                value={formik.values.badge}
                                onChange={formik.handleChange}
                                displayEmpty
                                inputProps={{ dir: 'rtl' }}
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return <span style={{ color: '#aaa' }}>בחר תגית</span>; // כמו placeholder
                                    }
                                    return selected;
                                }}
                            >
                                <MenuItem dir="rtl" value="">ללא תגית</MenuItem>
                                <MenuItem dir="rtl" value="פופולרי">פופולרי</MenuItem>
                                <MenuItem dir="rtl" value="מומלץ">מומלץ</MenuItem>
                                <MenuItem dir="rtl" value="חדש">חדש</MenuItem>
                            </Select>

                        </FormControl>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>ביטול</Button>
                        <Button type="submit" variant="contained" color="primary">שמירה</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default AddCourseDialog;
