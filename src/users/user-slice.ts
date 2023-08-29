/** @format */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

const DEFAULT_STATE = [
  {
    name: "Peter Doe",
    id: "0",
    email: "peterdoe@gmail.com",
    github: "peterpeter",
  },
  {
    name: "Lena Whitehouse",
    id: "1",
    email: "lenawhitehouse@gmail.com",
    github: "lenawhite",
  },
  {
    name: "Phil Less",
    id: "2",
    email: "philless@gmail.com",
    github: "celinesco",
  },
];

export interface User {
  name: string;
  github: string;
  email: string;
}

export interface UserWithId extends User {
  id: string;
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: "users",
  initialState,
  //   en reducer van las 'acciones'
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      return [...state, { id, ...action.payload }];
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyOnDB = state.some(
        (user) => user.id === action.payload.id
      );
      if (!isUserAlreadyOnDB) {
        return [...state, action.payload];
      }
    },
    editUser: (state, action: PayloadAction<UserWithId>) => {
      const changeElement = state.map((user) =>
        user.id !== action.payload.id ? user : action.payload
      );
      return changeElement;
    },
  },
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser, editUser } =
  usersSlice.actions;
