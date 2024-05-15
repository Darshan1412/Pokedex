import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDocs, query, where } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";
import { userPokemonsType } from "../../utils/Types";
import { defaultImages } from "../../utils/getPokemonImages";
import { pokemonsRoute } from "../../utils/Constants";
import { pokemonTypes } from "../../utils/getPokemonTypes";
import axios from "axios";

export const getUserPokemons = createAsyncThunk("pokemon/userList", async (args, { getState }) => {
    try {
        const { app: { userInfo } } = getState() as RootState;
        if (!userInfo?.email) {
            return [];
        }

        const firestoreQuery = query(pokemonListRef,
            where("email", "==", userInfo.email));
        const fetchedPokemons = await getDocs(firestoreQuery);
        if (fetchedPokemons.docs.length) {
            const userPokemonsPromises: Promise<userPokemonsType>[] = fetchedPokemons.docs.map(async (pokemon) => {
                const pokemonData = await pokemon.data().pokemon;

                const pokemonDetailsResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonData.id}`);
                const { sprites } = pokemonDetailsResponse.data;
                const image = sprites.other["official-artwork"].front_default;
                const shinyImage = sprites.other["official-artwork"].front_shiny;
                const spriteImage = sprites.front_default;
                const spriteShinyImage =sprites.front_shiny;

                const types = pokemonData.types.map((name: string) => ({
                    //@ts-ignore
                    [name]: pokemonTypes[name],
                }));
                return {
                    ...pokemonData,
                    firebaseId: pokemon.id,
                    image,
                    spriteImage,
                    shinyImage,
                    spriteShinyImage,
                    types,
                };
            });

            const userPokemons = await Promise.all(userPokemonsPromises);
            // console.log("userPokemons", userPokemons);
            return userPokemons;
        }
        return [];
    } catch (err) {
        console.log(err);
        throw err;
    }
});
