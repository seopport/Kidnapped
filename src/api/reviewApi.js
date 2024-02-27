import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_REVIEWS_URL
});

const getReviews = async () => {
  const response = await instance.get(``);
  console.log(response);
  return response;
};

export { instance, getReviews };
