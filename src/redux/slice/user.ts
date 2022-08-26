import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchState, GetAllResponse } from "interfaces/common";
import { CreateUserPayload, DeleteManyUserPayload, DeleteUserPayload, GetUserPayload, UpdateUserPayload, User } from "interfaces/user";
import { RootState } from "redux/store";

interface StateType extends FetchState {
	users: GetAllResponse<User>;
	currentUser: User | null;
}

const initialState: StateType = {
	isLoading: false,
	isError: false,
	users: {
		items: [],
		count: 0,
		totalPage: 0,
	},
	currentUser: null,
};
const name = "user";
export const userSlice = createSlice({
	name,
	initialState,
	reducers: {
		getAllUsersFetch: (state, action: PayloadAction<GetUserPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		getAllUsersSuccess: (state, action: PayloadAction<GetAllResponse<User>>) => {
			state.isLoading = false;
			state.users = action.payload;
		},
		getAllUsersFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		getCurrentUser: (state, action: PayloadAction<User | null>) => {
			if ((state.currentUser && !action.payload) || (!state.currentUser && action.payload)) {
				state.currentUser = action.payload;
			}
		},
		createUserFetch: (state, action: PayloadAction<CreateUserPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		createUserSuccess: (state, action: PayloadAction<User>) => {
			state.isLoading = false;
			state.users.items.unshift(action.payload);
			state.users.count += 1;
		},
		createUserFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		updateUserFetch: (state, action: PayloadAction<UpdateUserPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		updateUserSuccess: (state, action: PayloadAction<User>) => {
			state.isLoading = false;
			const newData = action.payload;
			const index = state.users.items.findIndex((item: User) => item.id === newData.id);
			if (index !== -1) {
				state.users.items[index] = {
					...state.users.items[index],
					...newData,
				};
			}
		},
		updateUserFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		deleteUserFetch: (state, action: PayloadAction<DeleteUserPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		deleteUserSuccess: (state, action: PayloadAction<number>) => {
			state.isLoading = false;
			const id = action.payload;
			state.users.items = state.users.items.filter((item: User) => item.id !== id);
			state.users.count -= 1;
		},
		deleteUserFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		deleteManyUserFetch: (state, action: PayloadAction<DeleteManyUserPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		deleteManyUserSuccess: (state, action: PayloadAction<React.Key[]>) => {
			state.isLoading = false;
			const ids = action.payload;
			state.users.items = state.users.items.filter((item: User) => !ids.includes(item.id));
			state.users.count -= 1;
		},
		deleteManyUserFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
	},
});

export const userActions = userSlice.actions;

export const getAllUsersAction = `${name}/getAllUsersFetch`;
export const createUserAction = `${name}/createUserFetch`;
export const updateUserAction = `${name}/updateUserFetch`;
export const deleteUserAction = `${name}/deleteUserFetch`;
export const deleteManyUserAction = `${name}/deleteManyUserFetch`;

export const userState = (state: RootState) => state.user;
