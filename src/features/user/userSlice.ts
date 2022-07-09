import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../domain/type/User';

const initialState: User = {
  uid: '',
  displayName: '',
  photoUrl: '',
  accessibleChannel: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialState
  },
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = { ...user };
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = { ...user };
    },
    logout: (state) => {
      state.user = initialState;
    }
  },
});

export const { login, logout, updateProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
