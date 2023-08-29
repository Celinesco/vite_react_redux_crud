/** @format */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../users/user-slice";

// en store va todo. Nuestro estado, las acciones, los reducers.
//  el store para estar organizado se divide en slice, porciones

// En esta funcion los parametros no se pasan todos juntos, porque se ejectuan paso a paso
const persistanceLocalStorage = (store) => (next) => (action) => {
  //   console.log("Estado anterior", store.getState());
  next(action);
  //   console.log("Estado posterior", store.getState());
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: [persistanceLocalStorage],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// magia para que detecte el tipo del store. Esto esta en la documentacion y solamente es esta linea.
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
