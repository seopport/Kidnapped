import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../modules/authSlice';
import reviewSlice from '../modules/reviewSlice';
import scrapSlice from '../modules/scrapSlice';

const store = configureStore({
  reducer: {
    authSlice,
    reviewSlice,
    scrapSlice
  }
});

export default store;
