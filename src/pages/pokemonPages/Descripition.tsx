import React from "react";
import { useAppSelector } from "../../app/hooks";
import PokemonContainer from "../../components/PokemonContainer";
import Info from "../../components/Info";

function Descripition() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  // console.log("Current Pokemon Data:", pokemonData);
  // console.log("Normal Image:", pokemonData?.image);

  return (
    <div>
      {pokemonData && (
        <>
          <Info data={pokemonData} />
          <PokemonContainer image={pokemonData?.image!} />
        </>
      )}
    </div>
  );
}

export default Descripition;
