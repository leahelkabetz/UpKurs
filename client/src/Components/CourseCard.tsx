import React, { useEffect, useState } from 'react';
import {
  Card, Typography, Box, Avatar, Button, Stack,
  IconButton, Rating, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/slices/cartSlice';
import { deleteProduct, updateProduct } from '../api/coursesApi';
import { Course } from '../models/course';
import { colors, fonts } from '../styles/theme';
import ReviewsCard from './ReviewsCard';
import { showMessage } from '../redux/slices/messageSlice';

interface CourseCardProps {
  course: Course;
  onDeleted: () => void;
  onEdited: () => void;
  onReviews?: () => void;
  onRefreshPopular?: () => void;
  refreshPopular?: () => void;
}

export default function CourseCard({ course, onDeleted, onEdited, onReviews, refreshPopular }: CourseCardProps) {
  const [openReviews, setOpenReviews] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState<Course>({ ...course });
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
const fallbackImage = "https://www.nakarmedic.co.il/wp-content/uploads/2022/04/top-6-eLearning-trends-of-2019.jpg";
const [imgSrc, setImgSrc] = useState(course.image||fallbackImage);

  const dispatch = useDispatch();

  useEffect(() => {
    setEditedCourse({ ...course });
  }, [course]);

  const renderTextField = (label: string, value: string | number, onChange: (val: string) => void, type: string = "text") => (
    <TextField
      label={label}
      value={value}
      dir='rtl'
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      size="small"
      type={type}
      sx={{
        mb: 2,
        '& label': {
          right: 26,
          left: 'auto',
          transformOrigin: 'top right',
        },
        '& legend': {
          textAlign: 'right',
        },
        '& .MuiOutlinedInput-root': {
          direction: 'ltr',
        }
      }}
      InputLabelProps={{ sx: { right: 4, left: 'auto', transformOrigin: 'top right' } }}
    />
  );

  const renderBadgeSelect = () => (
    <FormControl fullWidth size="small" sx={{ mb: 2, direction: 'rtl' }}>
      <InputLabel id="badge-label" shrink sx={{ right: 30, left: 'auto', transformOrigin: 'top right' }}>תגית</InputLabel>
      <Select
        labelId="badge-label"
        value={editedCourse.badge || ''}
        onChange={(e) => setEditedCourse({ ...editedCourse, badge: e.target.value })}
        displayEmpty
        inputProps={{ dir: 'rtl', style: { textAlign: 'right' } }}
        sx={{ '& .MuiSelect-select': { textAlign: 'right' } }}
      >
        <MenuItem value=""><em>ללא תגית</em></MenuItem>
        <MenuItem value="פופולרי">פופולרי</MenuItem>
        <MenuItem value="מומלץ">מומלץ</MenuItem>
        <MenuItem value="חדש">חדש</MenuItem>
      </Select>
    </FormControl>
  );

  const handleEditClick = () => setIsEditing(true);
  const handleCancelEdit = () => {
    setEditedCourse({ ...course });
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      await updateProduct(course.id, editedCourse);
      onEdited();
      dispatch(showMessage({ type: 'success', text: 'הקורס עודכן בהצלחה!' }));
      setIsEditing(false);
    }
    catch {
      dispatch(showMessage({ type: 'error', text: 'לא הצלחנו לעדכן את הקורס:(' }));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(course.id);
      onDeleted();
      dispatch(showMessage({ type: 'success', text: 'הקורס נמחק בהצלחה!' }));
    }
    catch {
      dispatch(showMessage({ type: 'error', text: 'לא הצלחנו למחוק את הקורס:(' }));

    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%', 
        minHeight: 420, 
        position: 'relative',
        p: 2,
        border: '1px solid #eee',
        borderRadius: 3,
        fontFamily: fonts.base,
        direction: 'rtl',
      }}
    >

      {course.badge && (
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, backgroundColor: colors.AccentLight, color: '#fff', fontSize: 12, borderRadius: 8, px: 1.5, py: 0.5, maxWidth: '80%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{course.badge}</Box>
      )}

      {isEditing ? renderBadgeSelect() : null}

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Avatar variant="square" 
          src={imgSrc}
        sx={{ width: 120, height: 120, backgroundColor: '#f3f3f3' }} />
      </Box>

      {isEditing && renderTextField("כתובת תמונה (URL)", editedCourse.image, val => setEditedCourse({ ...editedCourse, image: val }))}
      {isEditing ? renderTextField("קטגוריה", editedCourse.category, val => setEditedCourse({ ...editedCourse, category: val })) : <Typography>{editedCourse.category}</Typography>}
      {isEditing ? renderTextField("כותרת", editedCourse.title, val => setEditedCourse({ ...editedCourse, title: val })) : <Typography variant="h6" fontWeight="bold">{editedCourse.title}</Typography>}
      {isEditing ? renderTextField("תיאור", editedCourse.description, val => setEditedCourse({ ...editedCourse, description: val })) : <Typography>{editedCourse.description}</Typography>}

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <StarIcon sx={{ fontSize: 18, color: '#ffb400' }} />
          <Typography variant="body2">{editedCourse.rating}</Typography>
        </Stack>
        {isEditing ? renderTextField("מחיר", editedCourse.price, val => setEditedCourse({ ...editedCourse, price: +val }), "number") : <Typography fontWeight="bold">₪{editedCourse.price}</Typography>}
      </Stack>

      <Stack spacing={1}>
        {isAdmin ? (
          isEditing ? (
            <Stack direction="row" spacing={1}>
              <Button onClick={handleSaveEdit}>שמור</Button>
              <Button onClick={handleCancelEdit}>בטל</Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <IconButton onClick={handleEditClick}><EditIcon color="primary" /></IconButton>
              <IconButton onClick={handleDelete}><DeleteIcon color="error" /></IconButton>
            </Stack>
          )
        ) : (
          <>
            <Button fullWidth sx={{ backgroundColor: colors.Primary, color: '#fff' }}
              onClick={() => {
                dispatch(addToCart({
                course:course
                }));
              }}

            >הוסף לסל</Button>
    
            <Button fullWidth variant="outlined" sx={{ color: colors.Primary, borderColor: colors.Primary, marginBottom: 2 }} onClick={() => setOpenReviews(true)}>צפה בחוות דעת</Button>
            <ReviewsCard open={openReviews} onClose={() => setOpenReviews(false)} courseId={course.id} courseTitle={course.title}
              onReviewAdded={onReviews}
              onRefreshPopular={refreshPopular}
            />
          </>
        )}
      </Stack>
    </Card>
  );
}
