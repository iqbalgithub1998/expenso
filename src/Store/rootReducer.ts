import {combineReducers} from '@reduxjs/toolkit';
import UserSlice from './Slice/UserSlice';
import TransactionSlice from './Slice/TransactionSlice';
const rootReducer = combineReducers({
  user: UserSlice,
  transaction: TransactionSlice,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
