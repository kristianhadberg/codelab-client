import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import topicsReducer from '../redux/slices/topics'
import exercisesReducer from '../redux/slices/exercises'

export const store = configureStore({
  reducer: {
    topics: topicsReducer,
    exercises: exercisesReducer,
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
