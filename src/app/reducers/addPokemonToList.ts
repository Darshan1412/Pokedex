import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonStatsType, pokemonTypeInterface, userPokemonsType } from "../../utils/Types";
import { RootState } from "../store";
import { setToast } from "../slices/AppSlice";
import { resolveTypeReferenceDirective } from "typescript";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";
import { poemonAPI } from "../../utils/Constants";
import { getUserPokemons } from "./getUserPokemons";

export const addPokemonToList = createAsyncThunk("pokemon/addPoekmon",
    async (pokemon:{
        id:number;
        name:string;
        types:pokemonTypeInterface[] | string[];
        stats?:pokemonStatsType[];
    },
    { getState,dispatch }
) => {
    try{
        const {
            app: { userInfo },
            pokemon: { userPokemons },
        } = getState() as RootState;
        if(!userInfo?.email){
            return dispatch(setToast("Please Login to Add Pokemon to Your Collection."));
        }
        const index = userPokemons.findIndex((userPokemon: userPokemonsType) => {
            return userPokemon.name === pokemon.name;
        });
        if(index===-1){
            let types: string[] = [];

            if(!pokemon.stats){
                pokemon.types.forEach((type: any)=> types.push(Object.keys(type).toString()));
            } else{
                types = pokemon.types as string[];
            }
            
            await addDoc(pokemonListRef,{
                pokemon:{id:pokemon.id,name: pokemon.name,types},
                email:userInfo.email,
            });
            await dispatch(getUserPokemons());
            return dispatch(setToast(`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} added to your collection.`))
        } else{
            return dispatch(setToast(`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} is already a part of your ollection.`))
        }
    } catch (err){
        console.log(err)
    }
}
);