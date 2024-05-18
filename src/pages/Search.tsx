import React, { useEffect, useState } from "react";
import Wrapper from "sections/Wrapper";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getInitialPokemonData } from "app/reducers/getInitialPokemonData";
import { getPokemonsData } from "app/reducers/getPokemonsData";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Pokemon from "./Pokemon";
import PokemonCardGrid from "components/PokemonCardGrid";
import { debounce } from "utils/Debounce";
import Loader from "components/Loader";
import { setLoading } from "app/slices/AppSlice";

function Search() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(({ app: { isLoading } }) => isLoading);
  const { allPokemon, randomPokemons } = useAppSelector(({ pokemon }) => pokemon);
  const [generation, setGeneration] = useState("All");
  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
  
    if (allPokemon && randomPokemons) {
      dispatch(setLoading(false));
    };

  }, [allPokemon, randomPokemons, dispatch]);

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
      dispatch(setLoading(true));

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
        // randomPokemonsId = clonedPokemons
        //   .filter(pokemon => {
        //     const nameParts = pokemon.name.split("-");
        //     const baseName = nameParts[0].trim();
        //     return !(baseName.toLowerCase().includes("-mega") || baseName.toLowerCase().includes("-gmax")|| baseName.toLowerCase().includes("-"));
        //   })
        //   .sort(() => Math.random() - Math.random())
        //   .slice(0, 30);
      }

      dispatch(getPokemonsData(randomPokemonsId));
    }
  }, [allPokemon, dispatch, generation]);

  const handleChange = debounce((value:string) => getPokemons(value), 300);
  // const handleChange = (value: string) => getPokemons(value);

  // const getPokemons = async (value: string) => {
  //   if (value.length) {
  //     const pokemons = allPokemon?.filter((pokemon) =>
  //       pokemon.name.includes(value.toLowerCase()) &&
  //       !(pokemon.name.toLowerCase().includes("-mega") || pokemon.name.toLowerCase().includes("-gmax"))
  //     );
  //     if (pokemons) {
  //       dispatch(getPokemonsData(pokemons));
  //     }
  //   } else {
  //     if (allPokemon) {
  //       const clonedPokemons = [...allPokemon];
  //       const randomPokemonsId = clonedPokemons
  //         .filter(pokemon => 
  //           !(pokemon.name.toLowerCase().includes("-mega") || pokemon.name.toLowerCase().includes("-gmax") )
  //         )
  //         .sort(() => Math.random() - Math.random())
  //         .slice(0, 30);
  //       dispatch(setLoading(true));
  //       dispatch(getPokemonsData(randomPokemonsId));
  //     }
  //   }
  // }

  const getPokemons = async (value: string) => {
    if (value.length) {
      const pokemons = allPokemon?.filter((pokemon) =>
        pokemon.name.includes(value.toLowerCase())
      );
      dispatch(getPokemonsData(pokemons!));
    } else {
      const clonedPokemons = [...(allPokemon as [])];
      // const randomPokemonsId = clonedPokemons.slice(0, 40);
      dispatch(setLoading(true));
      const randomPokemonsId = clonedPokemons.sort(() => Math.random() - Math.random()).slice(0, 30);
      dispatch(getPokemonsData(randomPokemonsId));
    }
  }
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search">
          <input
            type="text"
            className="pokemon-searchbar"
            placeholder="Search Pokemon"
            onChange={(e) => handleChange(e.target.value)}
          />
          {window.innerWidth <= 768 && (
            <select
              className="generation-dropdown"
              value={generation}
              onChange={(e) => setGeneration(e.target.value)}
            >
            <option value="All">Filter by Gen</option>
              <option value="Gen1">Gen 1 </option>
              <option value="Gen2">Gen 2 </option>
              <option value="Gen3">Gen 3 </option>
              <option value="Gen4">Gen 4 </option>
              <option value="Gen5">Gen 5 </option>
              <option value="Gen6">Gen 6 </option>
              <option value="Gen7">Gen 7 </option>
              <option value="Gen8">Gen 8 </option>
              <option value="Gen9">Gen 9 </option>
            </select>
          )}
          {window.innerWidth > 768 && (
            <select
              className="generation-dropdown"
              value={generation}
              onChange={(e) => setGeneration(e.target.value)}
            >
              <option value="All">Filter by Generation</option>
              <option value="Gen1">Gen 1 (Kanto Region)</option>
              <option value="Gen2">Gen 2 (Johto Region)</option>
              <option value="Gen3">Gen 3 (Hoenn Region)</option>
              <option value="Gen4">Gen 4 (Sinnoh Region)</option>
              <option value="Gen5">Gen 5 (Unova Region)</option>
              <option value="Gen6">Gen 6 (Kalos Region)</option>
              <option value="Gen7">Gen 7 (Alola Region)</option>
              <option value="Gen8">Gen 8 (Galar Region)</option>
              <option value="Gen9">Gen 9 (Paldea Region)</option>
            </select>
          )}
          <PokemonCardGrid pokemons={randomPokemons!} />
        </div>
      )}
    </>
  );
  
}

export default Wrapper(Search);