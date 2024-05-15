import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "../../utils/Types";
import { pokemonTabs } from "../../utils/Constants";

const initialState: AppTypeInitialState = {
    toasts: [],
    userInfo: undefined,
    currentPokemonTab:pokemonTabs.description,
    isLoading: true,
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
        },
        setUserStatus: (state, action) =>{
            state.userInfo = action.payload;
        },
        setPokemonTab: (state,action) =>{
            state.currentPokemonTab = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
          },
    },
});  

// eslint-disable-next-line no-empty-pattern
export const { setToast, clearToasts, setUserStatus, setPokemonTab , setLoading} = AppSlice.actions;