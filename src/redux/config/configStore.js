import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../modules/authSlice';
import reviewSlice from '../modules/reviewSlice';

const store = configureStore({
  reducer: {
    authSlice,
    reviewSlice,
  }
});

export default store;
