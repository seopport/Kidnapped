import axios from 'axios';
import { toast } from 'react-toastify';
//import store from 'redux/config/configStore';
//import { logout } from 'redux/modules/authSlice';

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
    toast.error(err.response.data.message);
    // if (err.response.data.message === '토큰이 만료되었습니다. 다시 로그인 해주세요.') {
    //   // 로그아웃 처리
    //   //return store.dispatch(logout());
    // }
    return Promise.reject(err);
  }
);
