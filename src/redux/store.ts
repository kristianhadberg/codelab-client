import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import topicsReducer from '../redux/slices/topics'

export const store = configureStore({
  reducer: {
    topics: topicsReducer,
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
