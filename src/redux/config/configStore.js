import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../modules/authSlice';
import reviewSlice from '../modules/reviewSlice';
import scrapSlice from '../modules/scrapSlice';
import userSlice from '../modules/userSlice';

const store = configureStore({
  reducer: {
    authSlice,
    reviewSlice,
    scrapSlice,
    userSlice
  }
});

export default store;
