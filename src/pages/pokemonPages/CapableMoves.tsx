import React from "react";
import { useAppSelector } from "../../app/hooks";

function CapableMoves() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return (
    <div className="pokemon-moves">
      <h1 className="pokemon-moves-title">Abilites</h1>
      <ul className="pokemon-moves-list ability">
        {pokemonData?.pokemonAbilities?.abilities.map((ability: string) => (
          <li key={ability} className="pokemon-move">
            {ability}
          </li>
        ))}
      </ul>
      <h1 className="pokemon-moves-title">Moves</h1>
      <ul className="pokemon-moves-list">
        {pokemonData?.pokemonAbilities?.moves?.map((ability: string) => (
          <li key={ability} className="pokemon-move">
            {ability}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CapableMoves;
