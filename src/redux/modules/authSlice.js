import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: !!localStorage.getItem('accessToken')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const accessToken = action.payload;
      localStorage.setItem('accessToken', accessToken);
      state.isLogin = true;
    },
    logout: (state, action) => {
      state.isLogin = false;
      localStorage.clear();
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
