import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import channelReducer from './slice/channelSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
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
