import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: [  ]},
  reducers: {
    getUsers: (state, action) => {
        state.value.push(action.payload)
    },
    addUser: (state, action) => {
        state.value.push(action.payload);
      //  console.log("dispach....:", action.payload);
    },
    deleteUser: (state) => {
        state.value = [];
    },  
  },
});

export const {getUsers, addUser, deleteUser } = userSlice.actions
export default userSlice.reducer; 