/** @format */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/user-slice";

// en store va todo. Nuestro estado, las acciones, los reducers.
//  el store para estar organizado se divide en slice, porciones

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// magia para que detecte el tipo del store. Esto esta en la documentacion y solamente es esta linea.
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
