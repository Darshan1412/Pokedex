import React, { useEffect } from "react";
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
  const { allPokemon,randomPokemons} = useAppSelector(({pokemon})=>pokemon);
  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch]);

  useEffect(() => {
    if(allPokemon){
      const clonedPokemons = [...allPokemon];
      // const randomPokemonsId = clonedPokemons.sort(() => Math.random() - Math.random()).slice(0, 20);
      // const randomPokemonsId = clonedPokemons.slice(649,663 | 705);
      const randomPokemonsId = clonedPokemons.slice(0,40);
      dispatch(getPokemonsData(randomPokemonsId));
      // console.log(randomPokemonsId);
    }
  }, [allPokemon, dispatch]);

  const handleChange = debounce((value:string) => getPOkemons(value), 300);

  const getPOkemons = async(value:string) => {
    if(value.length){
      const pokemons = allPokemon?.filter((pokemon) => 
      pokemon.name.includes(value.toLowerCase())
      );
      dispatch(getPokemonsData(pokemons!));
    } else{
      const clonedPokemons = [...(allPokemon as [])];
      const randomPokemonsId = clonedPokemons.slice(0,40);
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
    <PokemonCardGrid pokemons={randomPokemons!} />
  </div>
  </> 
}

export default Wrapper(Search);