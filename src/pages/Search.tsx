import React, { useEffect, useState } from "react";
import Wrapper from "../sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getInitialPokemonData } from "../app/reducers/getInitialPokemonData";
import { getPokemonsData } from "../app/reducers/getPokemonsData";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Pokemon from "./Pokemon";
import PokemonCardGrid from "../components/PokemonCardGrid";
import { debounce } from "../utils/Debounce";

function Search() {
  const dispatch = useAppDispatch();
  const { allPokemon, randomPokemons } = useAppSelector(({ pokemon }) => pokemon);
  const [generation, setGeneration] = useState("All");
  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch]);

  // useEffect(() => {
  //   if(allPokemon){
  //     const clonedPokemons = [...allPokemon];
  //     // const randomPokemonsId = clonedPokemons.sort(() => Math.random() - Math.random()).slice(0, 20);
  //     // const randomPokemonsId = clonedPokemons.slice(649,663 | 705);
  //     const randomPokemonsId = clonedPokemons.slice(0,40);
  //     dispatch(getPokemonsData(randomPokemonsId));
  //     // console.log(randomPokemonsId);
  //   }
  // }, [allPokemon, dispatch]);

  useEffect(() => {
    if (allPokemon) {
      const clonedPokemons = [...allPokemon];
      let randomPokemonsId;


      if (generation === "Gen1") {
        randomPokemonsId = clonedPokemons.slice(0, 151);
      } else if (generation === "Gen2") {
        randomPokemonsId = clonedPokemons.slice(151, 252);
      } else if (generation === "Gen3") {
        randomPokemonsId = clonedPokemons.slice(251, 386);
      } else if (generation === "Gen4") {
        randomPokemonsId = clonedPokemons.slice(386, 493);
      } else if (generation === "Gen5") {
        randomPokemonsId = clonedPokemons.slice(493, 649);
      } else if (generation === "Gen6") {
        randomPokemonsId = clonedPokemons.slice(649, 721);
      } else if (generation === "Gen7") {
        randomPokemonsId = clonedPokemons.slice(721, 809);
      } else if (generation === "Gen8") {
        randomPokemonsId = clonedPokemons.slice(809, 905);
      } else if (generation === "Gen9") {
        randomPokemonsId = clonedPokemons.slice(905, 1025);
      } else {
        randomPokemonsId = clonedPokemons.sort(() => Math.random() - Math.random()).slice(0, 30);
      }

      dispatch(getPokemonsData(randomPokemonsId));
    }
  }, [allPokemon, dispatch, generation]);

  const handleChange = debounce((value:string) => getPokemons(value), 300);
  // const handleChange = (value: string) => getPokemons(value);

  const getPokemons = async (value: string) => {
    if (value.length) {
      const pokemons = allPokemon?.filter((pokemon) =>
        pokemon.name.includes(value.toLowerCase())
      );
      dispatch(getPokemonsData(pokemons!));
    } else {
      const clonedPokemons = [...(allPokemon as [])];
      // const randomPokemonsId = clonedPokemons.slice(0, 40);
      const randomPokemonsId = clonedPokemons.sort(() => Math.random() - Math.random()).slice(0, 30);
      dispatch(getPokemonsData(randomPokemonsId));
    }
  }

  return <>
    <div className="search">
      <input type="text"
        className="pokemon-searchbar"
        placeholder="Search Pokemon"
        onChange={(e) => handleChange(e.target.value)}
      />
      <select
        className="generation-dropdown"
        value={generation}
        onChange={(e) => setGeneration(e.target.value)}
      >
        <option value="All">Filter by Generation</option>
        <option value="Gen1">Generation 1 (Kanto)</option>
        <option value="Gen2">Generation 2 (Johto)</option>
        <option value="Gen3">Generation 3 (Hoenn)</option>
        <option value="Gen4">Generation 4 (Sinnoh)</option>
        <option value="Gen5">Generation 5 (Unova)</option>
        <option value="Gen6">Generation 6 (Kalos)</option>
        <option value="Gen7">Generation 7 (Alola)</option>
        <option value="Gen8">Generation 8 (Galar)</option>
        <option value="Gen9">Generation 9 (Paldea)</option>
      </select>
      <PokemonCardGrid pokemons={randomPokemons!} />
    </div>
  </>
}

export default Wrapper(Search);