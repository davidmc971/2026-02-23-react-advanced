import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
// import { counterSlice } from "./slices/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // counter: counterSlice.reducer,
  },
});

// Aus Redux Toolkit, an sich braucht man das aber nicht, wenn man direkt aus den Slices die Actions und Selectors verwendet.

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
