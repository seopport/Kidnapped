import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { toast } from 'react-toastify';

const initialState = {
  isLogin: !!localStorage.getItem('accessToken'),
  avatar: localStorage.getItem('avatar'),
  nickname: localStorage.getItem('nickname'),
  userId: localStorage.getItem('userId')
};

export const __login = createAsyncThunk('login', async ({ id, password }, thunkAPI) => {
  try {
    const { data } = await authApi.post('/login?expiresIn=30m', {
      id,
      password
    });
    const { accessToken, nickname, avatar, userId } = data;
    if (data.success) {
      toast.success('로그인 성공!');
      return { accessToken, nickname, avatar, userId };
    }
  } catch (err) {
    toast.error(err.response.data.message);
    return thunkAPI.rejectWithValue(err);
  }
});

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
  },
  extraReducers: (builder) => {
    builder.addCase(__login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__login.fulfilled, (state, action) => {
      const { accessToken, avatar, nickname, userId } = action.payload;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('avatar', avatar);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('userId', userId);
      state.isLogin = true;
      state.avatar = avatar;
      state.nickname = nickname;
      state.userId = userId;
      state.isLoading = false;
    });
    builder.addCase(__login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
