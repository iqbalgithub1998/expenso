import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TransactionState {
  expenseSum: number;
  lentSum: number;
}

const initialState: TransactionState = {
  expenseSum: 0,
  lentSum: 0,
};

const TransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setExpenseSum: (state, action: PayloadAction<number>) => {
      state.expenseSum = action.payload;
    },
    setLentSum: (state, action: PayloadAction<number>) => {
      state.lentSum = action.payload;
    },
  },
});
export const {setExpenseSum, setLentSum} = TransactionSlice.actions;
export default TransactionSlice.reducer;
