import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: { value: [] },
  reducers: {
    getLogin: (state, action) => {
      state.value.push(action.payload);
    },
    add: (state, action) => {
      console.log("Displach...:", action.payload);
    //  state.value.push(action.payload);
      console.log("Displach...:", action.payload)
    },
    deleteLogin: (state, action) => {
      const userFound = state.find((login) => login.id === action.payload);
      if (userFound) {
        state.splice(state.indexOf(userFound), 1);
      }
    },
    updateLogin: (state, action) => {
      const userFound = state.find((login) => login.id === action.payload);
      if (userFound) {
        state.splice(state.indexOf(userFound), 1);
      }
      state.find.push(action.payload);
    },
  },
});

export const { addLogin, deleteLogin, updateLogin } = loginSlice.actions;
export default loginSlice.reducer;
