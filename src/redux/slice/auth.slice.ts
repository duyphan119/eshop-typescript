import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE } from "constant";
import { EditProfilePayload, LoginPayload, LoginResponse, RegisterPayload } from "interfaces/auth";
import { ExtraPayloadType, FetchState, NavigatePayload } from "interfaces/common";
import { User } from "interfaces/user";
import { RootState } from "redux/store";

interface StateType extends FetchState {
	me: User | null;
	accessToken: string | null;
	login: FetchState;
	register: FetchState;
}

const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN_NAME);

const initialState: StateType = {
	me: null,
	accessToken: token === "null" ? null : token,
	isLoading: false,
	isError: false,
	register: {
		isLoading: false,
		isError: false,
	},
	login: {
		isLoading: false,
		isError: false,
	},
};
const name = "auth";
export const authSlice = createSlice({
	name,
	initialState,
	reducers: {
		loginFetch: (state, action: PayloadAction<LoginPayload>) => {
			state.login.isLoading = true;
			state.login.isError = false;
		},
		loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
			const { accessToken } = action.payload;
			state.accessToken = accessToken;
			state.login.isLoading = false;
			localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN_NAME, "" + state.accessToken);
		},
		loginFailure: (state) => {
			state.login.isLoading = false;
			state.login.isError = true;
		},
		getMeFetch: (state, action: PayloadAction<ExtraPayloadType>) => {
			state.isLoading = true;
			state.isError = false;
		},
		getMeSuccess: (state, action: PayloadAction<User | null>) => {
			state.me = action.payload;
			state.isError = false;
			state.isLoading = false;
		},
		getMeFailure: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
		getNewAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload;
			localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN_NAME, "" + state.accessToken);
		},
		registerFetch: (state, action: PayloadAction<RegisterPayload>) => {
			state.register.isLoading = true;
			state.register.isError = false;
		},
		registerSuccess: (state, action: PayloadAction<LoginResponse>) => {
			const { accessToken } = action.payload;
			state.accessToken = accessToken;
			state.register.isLoading = false;
			localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN_NAME, "" + state.accessToken);
		},
		registerFailure: (state) => {
			state.register.isLoading = false;
			state.register.isError = true;
		},
		logoutFetch: (state, action: PayloadAction<NavigatePayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		logoutSuccess: (state) => {
			state.accessToken = null;
			state.isError = false;
			state.isLoading = false;
			localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN_NAME, "" + state.accessToken);
		},
		logoutFailure: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
		editProfileFetch: (state, action: PayloadAction<EditProfilePayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		editProfileSuccess: (state, action: PayloadAction<User>) => {
			state.me = action.payload;
			state.isError = false;
			state.isLoading = false;
		},
		editProfileFailure: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

export const authActions = authSlice.actions;

export const loginAction = `${name}/loginFetch`;
export const registerAction = `${name}/registerFetch`;
export const getMeAction = `${name}/getMeFetch`;
export const logoutAction = `${name}/logoutFetch`;
export const editProfileAction = `${name}/editProfileFetch`;

export const authState = (state: RootState) => state.auth;
