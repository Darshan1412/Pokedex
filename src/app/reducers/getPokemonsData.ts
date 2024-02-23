import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pokemonTypes } from "../../utils/getPokemonTypes";

export const getPokemonsData = createAsyncThunk(
  "pokemon/randomPokemon",
  async (pokemons: genericPokemonType[]) => {
    try {
      const pokemonsData: generatedPokemonType[] = [];
      for await (const pokemon of pokemons) {
        const { data }: { data: generatedPokemonType } = await axios.get(pokemon.url);
        
        const imageResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
        const image = imageResponse.data.sprites.other["official-artwork"].front_default;
        const spriteImage = imageResponse.data.sprites.front_default;


        const types = data.types.map(
          ({ type: { name } }: { type: { name: string } }) => ({
            //@ts-expect-error
            [name]: pokemonTypes[name],
          })
        );
        
        pokemonsData.push({
          name: data.name,
          id: data.id,
          image,
          spriteImage,
          types,
        });
      }
      return pokemonsData;
    } catch (err) {
      console.error(err);
    }
  }
);

type genericPokemonType = any; 
type generatedPokemonType = any; 
