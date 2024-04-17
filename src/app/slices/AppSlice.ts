import { createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "../../utils/Types";

const initialState: AppTypeInitialState = {
    toasts: [],
};

export const AppSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setToast: (state, action) => {
            const toasts =  [...state.toasts];
            toasts.push(action.payload);
            state.toasts = toasts;
        },
        clearToasts: (state)=> {
            state.toasts = [];
        }
    },
});  

// eslint-disable-next-line no-empty-pattern
export const { setToast, clearToasts } = AppSlice.actions;