import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import topicsReducer from '../redux/slices/topics'
import exercisesReducer from '../redux/slices/exercises'
import submissionsReducer from '../redux/slices/submissions'
import userReducer from './auth/auth'

export const store = configureStore({
  reducer: {
    user: userReducer,
    topics: topicsReducer,
    exercises: exercisesReducer,
    submissions: submissionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
