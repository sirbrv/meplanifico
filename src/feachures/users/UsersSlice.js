import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: [] },
  reducers: {
    getUsers: (state, action) => {
      state.value.push(action.payload);
    },
    addUser: (state, action) => {
      state.value.push(action.payload);
      //  console.log("dispach....:", action.payload);
    },
    deleteUser: (state, action) => {
      state.value = new Array();
      /*      const newTodos = state.users.filter(
            (todo) =>
             todo.id !== action.payload[0]  
          );
          // "Mutate" the existing state to save the new array
          console.log("Los peyload", newTodos)
          state.users = newTodos; */
      // return state.filter((user) => user.id !== action.payload);
    },
  },
});

export const { getUsers, addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
