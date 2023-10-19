
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    role: null,
    user:{}
};

const authSlice = createSlice({
    name: "auth",
  initialState,
  reducers: {
      login(state, action) {
        console.log("darasal",action.payload)
        if (action.payload.token) {
          state.token = action.payload.token;
      }
      if (action.payload.role) {
          state.role = action.payload.role;
      }
      if (action.payload.user ) {
          state.user = action.payload.user;
      }
      if(action.payload.student){
        state.user = action.payload.student;
      }
    },
    logout(state) {
      state.token = null;
      state.role = null;
      state.user= {};
    },
},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login(state) {
//       state.isAuthenticated = true;
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
