import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TransactionItemProps} from '../../interface/User.interface';

export interface TransactionState {
  userData: TransactionItemProps[];
}

const initialState: TransactionState = {
  userData: [],
};

const UserDataSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<TransactionItemProps[]>) => {
      state.userData = [...action.payload];
    },
  },
});
export const {setUserData} = UserDataSlice.actions;
export default UserDataSlice.reducer;
