import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user";

interface StateType {
  me: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isError: boolean;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: null,
    isLoading: false,
    accessToken: localStorage.getItem("AT"),
    isError: false,
  } as StateType,
  reducers: {
    loginFetch: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      state.isError = false;
      state.isLoading = false;
      localStorage.setItem("AT", "" + state.accessToken);
    },
    loginFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    getMeFetch: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    getMeSuccess: (state, action) => {
      state.me = action.payload;
      state.isError = false;
      state.isLoading = false;
    },
    getMeFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    getNewAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("AT", "" + state.accessToken);
    },
    registerFetch: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    registerSuccess: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      state.isError = false;
      state.isLoading = false;
      localStorage.setItem("AT", "" + state.accessToken);
    },
    registerFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {
  loginFetch,
  loginSuccess,
  loginFailure,
  getMeFetch,
  getMeSuccess,
  getMeFailure,
  getNewAccessToken,
  registerFetch,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export const authState = (state: any) => state.auth;
