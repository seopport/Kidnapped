import axios from 'axios';

const instace = axios.create({
  baseURL: process.env.REACT_APP_SERVER_REVIEWS__URL
});

export default instace;
