import React, { useState } from "react";
import { IoGitCompare } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight, FaArrowLeft, FaArrowRight, FaPlus, FaTrash } from "react-icons/fa";
import { pokemonTypeInterface, userPokemonsType } from "utils/Types";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { addToCompare, setCurrentPokemon } from "app/slices/PokemonSlice";
import { setPokemonTab, setToast } from "app/slices/AppSlice";
import { removePokemon } from "app/reducers//removePokemonFromUserList";
import { addPokemonToList } from "app/reducers//addPokemonToList";
import { pokemonTabs } from "utils/Constants";

function PokemonCard({ data }: { data: userPokemonsType }) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showShinySprite, setShowShinySprite] = useState(false);

  const toggleSprite = (direction: "left" | "right") => {
    if (direction === "left") {
      setShowShinySprite(false);
    } else {
      setShowShinySprite(true);
    }
  };

  const [showShinyDefault, setShowShinyDefault] = useState(false);

  const toggleDefault = (direction: "left" | "right") => {
    if (direction === "left") {
      setShowShinyDefault(false);
    } else {
      setShowShinyDefault(true);
    }
  };
  return (
    <div className="pokemon-card" key={data.id}>
      <div className="pokemon-card-list">
      {location.pathname.includes("/pokemon") ||
                  location.pathname.includes("/search") ? (
                    <FaPlus
                      className="plus"
                      onClick={() => dispatch(addPokemonToList(data))}
                    />
                  ) : (
                    <FaTrash
                      className="trash"
                      onClick={async () => {
                        await dispatch(removePokemon({ id: data.firebaseId! }))
                        dispatch(setToast(`${data.name.charAt(0).toUpperCase() + data.name.slice(1)} removed from your collection.`))
                      }}
                    />
                  )}
      </div>
      <div className="pokemon-card-compare">
        <IoGitCompare
          onClick={() => {
            dispatch(addToCompare(data));
            dispatch(
              setToast(
                `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} has been added to compare queue.`
              )
            );
          }}
        />
      </div>
      <h3 className="pokemon-card-title">{data.name}</h3>
      {/* <div className="image-toggle">
        <FaAngleLeft className="angleLeft" onClick={() => toggleDefault("left")}/>
        <img
          src={showShinyDefault ? data.shinyImage : data.image}
          alt=""
          className="pokemon-card-image"
          loading="lazy"
          onClick={() => {
            dispatch(setPokemonTab(pokemonTabs.description));
            dispatch(setCurrentPokemon(undefined));
            navigate(`/pokemon/${data.id}`)}}
        />
        <FaAngleRight className="angleRight" onClick={() => toggleDefault("right")}/>
      </div> */}
      <div className="image-toggle">
        <FaAngleLeft className="angleLeft" onClick={() => toggleSprite("left")}/>
        <img
          src={showShinySprite ? data.spriteShinyImage : data.spriteImage}
          alt=""
          className="pokemon-card-image"
          loading="lazy"
          onClick={() => {
            dispatch(setPokemonTab(pokemonTabs.description));
            dispatch(setCurrentPokemon(undefined));
            navigate(`/pokemon/${data.id}`)}}
        />
        <FaAngleRight className="angleRight" onClick={() => toggleSprite("right")}/>
      </div>
      <div className="pokemon-card-types">
        {data.types.map(
          (type: pokemonTypeInterface, index: number) => {
            const keys = Object.keys(type);
            return (
              <div className="pokemon-card-types-type" key={index}>
                <img
                  src={type[keys[0]].image}
                  alt="pokemon type"
                  className="pokemon-card-types-type-image"
                  loading="lazy"
                />
                <h6 className="pokemon-card-types-type-text">
                  {keys[0]}
                </h6>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

function PokemonCardGrid({ pokemons }: { pokemons: userPokemonsType[] }) {
  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons?.map((data: userPokemonsType) => (
            <PokemonCard key={data.id} data={data} />
          ))}
      </div>
    </div>
  );
}

export default PokemonCardGrid;
