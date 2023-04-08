import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "../feachures/users/UsersSlice";
import loginReducer from "../feachures/LoginSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
  },
});