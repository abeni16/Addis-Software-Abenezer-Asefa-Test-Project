import { combineReducers } from '@reduxjs/toolkit';
import { songsReducer } from '../features/songSlice';

export const rootReducer = combineReducers({
  songs: songsReducer,
  // Add other reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;
