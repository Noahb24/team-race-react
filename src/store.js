import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './components/home/homeSlice';
import teamGenSlice from './components/teamGen/teamMakerSlice';


export const store = configureStore({
  reducer: {
    home: homeSlice,
    teamGen: teamGenSlice
  },
});
