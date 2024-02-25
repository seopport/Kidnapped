import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: !!localStorage.getItem('accessToken'),
  avatar: localStorage.getItem('avatar'),
  nickname: localStorage.getItem('nickname'),
  userId: localStorage.getItem('userId')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, nickname, avatar, userId } = action.payload;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('avatar', avatar);
      localStorage.setItem('userId', userId);
      state.isLogin = true;
      state.nickname = nickname;
      state.avatar = avatar;
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
