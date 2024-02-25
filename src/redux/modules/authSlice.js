import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: !!localStorage.getItem('accessToken'),
  nickname: localStorage.getItem('nickname'),
  userId: localStorage.getItem('userId')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, nickname, userId } = action.payload;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('userId', userId);
      state.isLogin = true;
      state.nickname = nickname;
      state.userId = userId;
    },
    logout: (state, action) => {
      state.isLogin = false;
      localStorage.clear();
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
