import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type User = {
  uid: string,
  displayName: string,
  photoUrl: string,
};

const initialState: User = {
  uid: '',
  displayName: '',
  photoUrl: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialState
  },
  reducers: {
    update: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  },
});

export const { update } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
