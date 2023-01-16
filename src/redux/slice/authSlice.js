import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userId: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
    reducers: {
        set_active_user: (state, action) => {
            // console.log(action.payload);
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.userName = action.payload.userName;
            state.userId = action.payload.userId;
      },
        remove_active_user: (state, action) => {
            state.isLoggedIn = false;
            state.email = "";
            state.userName = "";
            state.userId = "";
            // console.log(state.isLoggedIn);
      }
  }
});
export const {set_active_user, remove_active_user} = authSlice.actions
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectEmail = (state) => state.auth.email;
export const selectUsername = (state) => state.auth.userName;
export const selectUserId = (state) => state.auth.userId;


export default authSlice.reducer