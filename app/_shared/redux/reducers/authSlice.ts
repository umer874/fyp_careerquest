"use client";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    first_name?: string;
    last_name?: string;
    email?: string;
    profile_asset?: string | null;
  } | null;
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthReducer: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLoggedIn = true;
    },
    resetAuthReducer: () => initialState,
  },
});

export const { setAuthReducer, resetAuthReducer } = authSlice.actions;

export default authSlice.reducer;
