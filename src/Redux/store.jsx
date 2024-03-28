// store.js

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Slice/taskSlice";
import completedTodoReducer from "./Slice/completeSlice";
import counterReducer from "./Slice/counterSlice";
import postReducer from "./Slice/postSlice";
import jobsReducer from "./Slice/jobSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    completedTodos: completedTodoReducer,
    counter: counterReducer,
    posts: postReducer,
    jobs: jobsReducer,
  },
});

export default store;
