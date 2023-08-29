/** @format */

import { createSlice } from "@reduxjs/toolkit";

export interface User {
  name: string;
  github: string;
  email: string;
}

export interface UserWithId extends User {
  id: string;
}

const initialState: UserWithId[] = [
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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
