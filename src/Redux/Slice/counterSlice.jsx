import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: state => {
      state.count++;
    },
    decrement: state => {
      state.count--;
      if (state.count >= 0) {
        return state;
      } else state.count = 0;
    },
    reset: state => {
      state.count = 0;
    },
    incrementFive: (state, action) => {
      state.count = state.count + action.payload;
    },
  },
});

export const { increment, decrement, reset, incrementFive } = counterSlice.actions;

export default counterSlice.reducer;
