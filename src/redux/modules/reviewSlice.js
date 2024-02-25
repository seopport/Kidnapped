import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: []
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReview: (state, action) => {
      //페이로드: 리뷰 데이터 전체
      console.log(action.payload);
      return { ...state, reviews: action.payload };
    },
    addReview: (state, action) => {
      //페이로드: 리뷰 데이터 객체 하나
      return { ...state, reviews: [action.payload, ...state.reviews] };
    },
    modifyReview: (state, action) => {
      //페이로드: 리뷰아이디, 수정된 리뷰 내용, 평점
      const targetReviewId = action.payload.reviewId;
      const modifiedContent = action.payload.newContent.content;
      const modifiedGrade = action.payload.newContent.grade;

      const modifiedReviews = state.reviews.map((item) => {
        if (item.id === targetReviewId) {
          return { ...item, content: modifiedContent, grade: modifiedGrade };
        } else return item;
      });
      return { ...state, reviews: modifiedReviews };
    },

    deleteReview: (state, action) => {
      //페이로드: 리뷰아이디
      console.log(action.payload);
      const targetReviewId = action.payload;
      const newReviews = state.reviews.filter((item) => item.id !== targetReviewId);
      return { ...state, reviews: newReviews };
    }
  }
});

export const { setReview, addReview, modifyReview, deleteReview } = reviewSlice.actions;
export default reviewSlice.reducer;
