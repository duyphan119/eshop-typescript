import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

type StateType = {};

const initialState: StateType = {};
const name = "message";
export const messageSlice = createSlice({
	name,
	initialState,
	reducers: {},
});

export const messageActions = messageSlice.actions;

export const messageState = (state: RootState) => state.message;
