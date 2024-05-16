import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pokemonTypes } from "utils/getPokemonTypes";

export const getPokemonsData = createAsyncThunk(
  "pokemon/randomPokemon",
  async (pokemons: genericPokemonType[]) => {
    try {
      const pokemonRequests = pokemons.map(async (pokemon: genericPokemonType) => {
        const { data: generatedPokemon }: { data: generatedPokemonType } = await axios.get(pokemon.url);
        const { data: pokemonDetails } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${generatedPokemon.id}`);

        const image = pokemonDetails.sprites.other["official-artwork"].front_default;
        const shinyImage = pokemonDetails.sprites.other["official-artwork"].front_shiny;
        const spriteImage = pokemonDetails.sprites.front_default;
        const spriteShinyImage = pokemonDetails.sprites.front_shiny;

        const types = generatedPokemon.types.map(({ type: { name } }: { type: { name: string } }) => ({
          //@ts-expect-error
          [name]: pokemonTypes[name],
        }));

        return {
          name: generatedPokemon.name,
          id: generatedPokemon.id,
          image,
          spriteImage,
          shinyImage,
          spriteShinyImage,
          types,
        };
      });

      const pokemonsData = await Promise.all(pokemonRequests);
      return pokemonsData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
); 

interface genericPokemonType {
  url: string;
}

interface generatedPokemonType {
  name: string;
  id: number;
  types: { type: { name: string } }[];
}

