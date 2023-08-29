/** @format */
import { Middleware, configureStore } from "@reduxjs/toolkit";
import userReducer, { UserWithId, rollbackUser } from "../users/user-slice";
import { toast } from "sonner";

// en store va todo. Nuestro estado, las acciones, los reducers.
//  el store para estar organizado se divide en slice, porciones

// En esta funcion los parametros no se pasan todos juntos, porque se ejectuan paso a paso
const persistanceLocalStorage: Middleware = (store) => (next) => (action) => {
  //   console.log("Estado anterior", store.getState());
  next(action);
  //   console.log("Estado posterior", store.getState());
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};

const syncWithDataBase: Middleware = (store) => (next) => (action) => {
  console.log({ action, state: store.getState() });
  const { payload, type } = action;
  const previousState = store.getState();

  next(action);
  if (type === "users/deleteUserById") {
    const userIdToRemove = payload;
    const userToRemove: UserWithId | undefined = previousState.users.find(
      (user: UserWithId) => {
        return user.id === userIdToRemove;
      }
    );
    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.ok &&
          toast.success(`El usuario ${userIdToRemove} ha sido eliminado`);
        throw new Error("Error al eliminar el usuario");
      })
      .catch((err) => {
        toast.error("Error al eliminar usuario");
        userToRemove && store.dispatch(rollbackUser(userToRemove));
        console.log(err);
      });
  }
  console.log(store.getState());
};

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: [persistanceLocalStorage, syncWithDataBase],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// magia para que detecte el tipo del store. Esto esta en la documentacion y solamente es esta linea.
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
