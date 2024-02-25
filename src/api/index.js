import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr',
  headers: {
    'Content-Type': 'application/json'
  }
});

authApi.interceptors.request.use(
  (config) => {
    // 헤더에 토큰 넣기
    const accsessToken = localStorage.getItem('accessToken');
    if (accsessToken) {
      config.headers['Authorization'] = `Bearer ${accsessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log('err :', err);
    return Promise.reject(err);
  }
);
