import { createSlice } from "@reduxjs/toolkit";
import { PokemonTypeInitialState } from "../../utils/Types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";
import { getPokemonsData } from "../reducers/getPokemonsData";

const initialState: PokemonTypeInitialState = {
    allPokemon: undefined,
    randomPokemons: undefined,
};

export const PokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
            state.allPokemon = action.payload;
        });
        builder.addCase(getPokemonsData.fulfilled, (state, action) => {
            state.randomPokemons = action.payload;
        });
    }
});  

// eslint-disable-next-line no-empty-pattern
export const {} = PokemonSlice.actions;