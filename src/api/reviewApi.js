import axios from 'axios';

const instace = axios.create({
  baseURL: process.env.REACT_APP_SERVER_REVIEWS_URL
});

export default instace;
