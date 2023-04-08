import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../feachures/LoginSlice";
import usersReducer from "../feachures/users/UsersSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
  },
});
