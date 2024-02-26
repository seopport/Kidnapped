import { configureStore } from '@reduxjs/toolkit';
import reviewSlice from '../modules/reviewSlice';

const store = configureStore({
  reducer: {
    reviewSlice
  }
});

export default store;
