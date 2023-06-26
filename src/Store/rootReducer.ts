import {combineReducers} from '@reduxjs/toolkit';
import UserSlice from './Slice/UserSlice';
import TransactionSlice from './Slice/TransactionSlice';
import UserDataSlice from './Slice/UserDataSlice';
const rootReducer = combineReducers({
  user: UserSlice,
  transaction: TransactionSlice,
  userdata: UserDataSlice,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
