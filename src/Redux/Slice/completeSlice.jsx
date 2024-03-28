// reducers/completedTodoReducer.js

import { createSlice } from "@reduxjs/toolkit";

const completedTodoSlice = createSlice({
  name: "completedTodos",
  initialState: [],
  reducers: {
    addCompletedTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteCompletedTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { addCompletedTodo, deleteCompletedTodo } = completedTodoSlice.actions;
export default completedTodoSlice.reducer;
