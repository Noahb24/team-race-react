import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './components/home/homeSlice';


export const store = configureStore({
  reducer: {
    home: homeSlice
  },
});
