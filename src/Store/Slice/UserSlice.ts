import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../rootReducer';
import {UserInterface as User} from '../../interface/User.interface';
const initialState: User = {
  id: null,
  name: null,
  token: null,
};

export const UserSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      //   if (action.payload.id) state.id = action.payload.id;
      //   if (action.payload.name) state.name = action.payload.name;
      //   if (action.payload.token) state.token = action.payload.token;
    },
  },
});

export const {updateUser} = UserSlice.actions;

export const currentUser = (state: RootState) => state.user;

export default UserSlice.reducer;
