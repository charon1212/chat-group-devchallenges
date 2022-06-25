import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../domain/type/User';

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
    login: (state, action: PayloadAction<firebase.default.User>) => {
      const user = action.payload;
      state.user = {
        uid: user.uid,
        displayName: user.displayName || '',
        photoUrl: user.photoURL || '',
      }
    },
    logout: (state) => {
      state.user = initialState;
    }
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
