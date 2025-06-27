"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?:string;
  profile_asset?: string | null;
  skills?: string[];
  has_taken_test?: boolean;
  careerMatch?: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  token: string;
  refreshToken: string;
  accessToken: string;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  token: "",
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthReducer: (state, action: PayloadAction<{
      user: User;
      accessToken: string;
      refreshToken: string;
    }>) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLoggedIn = true;
    },

    updateUserSkills: (state, action: PayloadAction<{ skills: string[] }>) => {
      if (state.user) {
        state.user.skills = action.payload.skills;
      }
    },

    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    resetAuthReducer: () => initialState,
  },
});

export const {
  setAuthReducer,
  resetAuthReducer,
  updateUserSkills,
  updateUserProfile
} = authSlice.actions;

export default authSlice.reducer;
