import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Rating, Stack, TextField, Typography } from "@mui/material"
import { fonts } from "../styles/theme"
import { DeleteIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { ReviewWithUserName } from "../models/review";
import { addReviews, deleteReview, getReviewsWithUserNames } from "../api/reviewsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CloseIcon from '@mui/icons-material/Close';

interface ReviewsCardProps {
    open: boolean;
    onClose: () => void;
    courseId: string;
    courseTitle: string;
    onReviewAdded?: () => void;
    onRefreshPopular?: () => void
}
export default function ReviewsCard({ open, onClose, courseId, courseTitle, onReviewAdded, onRefreshPopular }: ReviewsCardProps) {
    const [reviews, setReviews] = useState<ReviewWithUserName[]>([]);
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.auth.id);

    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState<number>(0);

    useEffect(() => {
        if (open) {
            getReviewsWithUserNames(courseId).then(setReviews);
        }
    }, [open, courseId]);

    const handleDeleteReview = async (reviewId: string) => {
        try {
            await deleteReview(reviewId);
            const updatedReviews = await getReviewsWithUserNames(courseId);
            setReviews(updatedReviews); // מרענן את התצוגה
        } catch (err) {
            console.error("שגיאה במחיקת חוות הדעת:", err);
        }
    };

    // const handleAddReview = async () => {
    //     try {
    //         await addReviews({
    //             userId: userId,
    //             courseId: courseId,
    //             comment: newComment,
    //             rating: newRating,
    //         });
    //         if (onReviewAdded) onReviewAdded();
    //         if (onRefreshPopular) onRefreshPopular();

    //         const updatedReviews = await getReviewsWithUserNames(courseId);
    //         setReviews(updatedReviews);
    //         setNewComment('');
    //         setNewRating(0);

    //     } catch (error) {
    //         console.error('שגיאה בהוספת חוות דעת:', error);
    //     }

    // };
    const handleAddReview = async () => {
  try {
    await addReviews({
      userId: userId,
      courseId: courseId,
      comment: newComment,
      rating: newRating,
    });
 if (onReviewAdded) {
      onReviewAdded(); // מרענן את הפופולרי
    }
    if (onRefreshPopular) {
      onRefreshPopular(); // מרענן את הפופולרי
    }

    const updatedReviews = await getReviewsWithUserNames(courseId);
    setReviews(updatedReviews);
    setNewComment('');
    setNewRating(0);
  } catch (error) {
    console.error('שגיאה בהוספת חוות דעת:', error);
  }
};

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle
                    sx={{
                        fontFamily: fonts.heading,
                        direction: 'rtl',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {/* {editedCourse.title} */}
                    {courseTitle}
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ direction: 'rtl' }}>
                    {reviews.length === 0 ? (
                        <Typography>אין חוות דעת להצגה</Typography>
                    ) : (
                        reviews.map((review, index) => (
                            <Box key={index} sx={{ mb: 3, borderBottom: '1px solid #eee', pb: 2 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {review.userName}
                                    </Typography>

                                    {review.userId === userId && (
                                        <IconButton onClick={() => handleDeleteReview(review.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </Stack>
                                <Rating value={review.rating} readOnly size="small" />
                                <Typography variant="body2" sx={{ mt: 0.5 }}>{review.comment}</Typography>
                            </Box>
                        ))
                    )}

                    {/* טופס להוספת חוות דעת */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            הוסף חוות דעת משלך
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Rating
                            value={newRating}
                            onChange={(e, newValue) => setNewRating(newValue || 0)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddReview}
                            disabled={!newComment || newRating === 0}
                        >
                            שלח חוות דעת
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>

    )
}