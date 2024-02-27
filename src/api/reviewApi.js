import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_REVIEWS_URL
});

// 리뷰 데이터 가져오기
const getReviews = async () => {
  const response = await instance.get(``);
  console.log(response.data);
  return response.data;
};

// 리뷰 추가하기
const addReview = async (newReview) => {
  await instance.post('', newReview);
};

// 리뷰 수정하기
const modifyReview = async ({ reviewId, newContent }) => {
  console.log(reviewId, newContent);
  await instance.patch(`/${reviewId}`, newContent);
};

const deleteReview = async (reviewId) => {
  await instance.delete(`/${reviewId}`);
};

export { instance, getReviews, addReview, modifyReview, deleteReview };
