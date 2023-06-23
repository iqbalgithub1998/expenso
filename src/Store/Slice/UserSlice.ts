import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../rootReducer';
import {UserInterface as User} from '../../interface/User.interface';
const initialState: User = {
  userId: null,
  name: null,
  email: null,
};

export const UserSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (action.payload.userId) state.userId = action.payload.userId;
      if (action.payload.name) state.name = action.payload.name;
      if (action.payload.email) state.email = action.payload.email;
    },
    removeUser: state => {
      state.userId = null;
      state.name = null;
      state.email = null;
    },
  },
});

export const {updateUser, removeUser} = UserSlice.actions;

export const currentUser = (state: RootState) => state.user;

export default UserSlice.reducer;
