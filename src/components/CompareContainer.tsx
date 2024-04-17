import React from "react";
import { pokemonTypeInterface, userPokemonsType, pokemonStatType } from "../utils/Types";
import { pokemonTypes } from "../utils/getPokemonTypes";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch } from "../app/hooks";
import { removeFromCompare } from "../app/slices/PokemonSlice";
import { Navigate, useNavigate } from "react-router-dom";

function CompareContainer({
    pokemon,
    isEmpty = false,
}: {
    pokemon?: userPokemonsType;
    isEmpty?: boolean;
}) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const createStatsArray = (
        types: pokemonTypeInterface[],
        statType: pokemonStatType
    ) => {
        const statsArray: { name: string; image: string }[] = [];
        const statsSet = new Set<string>();
        types.forEach((type: pokemonTypeInterface) => {
            const key = Object.keys(type)[0];
            console.log({key});
            console.log({type});
            type[key][statType].forEach((stat: string) => {
                if (!statsSet.has(stat)) {
                    statsArray.push({
                        name: stat,
                         // @ts-ignore
                        image: pokemonTypes[stat].image,
                    });
                    statsSet.add(stat);
                }
            });
        });
        return statsArray;
    };

    const getStats = () => {
        const data = createStatsArray(pokemon?.types!, "strength");
        return (
            <>
                <div className="pokemon-types">
                    <h4 className="pokemon-type-title">Strength</h4>
                    <div className="pokemon-type-icons">
                        {createStatsArray(pokemon?.types!, "strength").map(
                            (stat: { image: string }) => (
                                <div className="pokemon-type">
                                    <img src={stat.image} alt="" className="pokemon-type-image" />
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="pokemon-types">
                    <h4 className="pokemon-type-title">Weakness</h4>
                    <div className="pokemon-type-icons">
                        {createStatsArray(pokemon?.types!, "weakness").map(
                            (stat: { image: string }) => (
                                <div className="pokemon-type">
                                    <img src={stat.image} alt="" className="pokemon-type-image" />
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="pokemon-types">
                    <h4 className="pokemon-type-title">Resistance</h4>
                    <div className="pokemon-type-icons">
                        {createStatsArray(pokemon?.types!, "resistance").map(
                            (stat: { image: string }) => (
                                <div className="pokemon-type">
                                    <img src={stat.image} alt="" className="pokemon-type-image" />
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="pokemon-types">
                    <h4 className="pokemon-type-title">Vulnerable</h4>
                    <div className="pokemon-type-icons">
                        {createStatsArray(pokemon?.types!, "vulnerable").map(
                            (stat: { image: string }) => (
                                <div className="pokemon-type">
                                    <img src={stat.image} alt="" className="pokemon-type-image" />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </>
        )
    };

    return (
        <div className="compare-container">
            {isEmpty && (
                <div className="compare-container-empty">
                    <button>
                        <FaPlus />
                    </button>
                    <h3>No Pokemons Found to Compare</h3>
                </div>
            )}
            {pokemon && (
                <div className="compare-element">
                    <div className="compare-info">
                        <div className="compare-details">
                            <h3>{pokemon?.name}</h3>
                            <img
                                src={pokemon?.image}
                                alt="pokemon"
                                className="compare-image"
                                loading="lazy"
                            />
                            {/* <img
                                    src={pokemon?.spriteImage}
                                    alt="pokemon"
                                    className="compare-image"
                                    loading="lazy"
                                /> */}
                        </div>
                        <div className="pokemon-types-container">
                            <div className="pokemon-types">
                                <h4 className="pokemon-type-title">Types</h4>
                                <div className="pokemon-type-icons">
                                    {pokemon?.types.map((type: pokemonTypeInterface) => {
                                        const keys = Object.keys(type);
                                        return (
                                            <div className="pokemon-type">
                                                <img
                                                    src={type[keys[0]].image}
                                                    alt="pokemon type"
                                                    className="pokemon-type-image"
                                                    loading="lazy"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {getStats()}
                        </div>
                    </div>
                    <div className="compare-action-buttons">
                        <button className="compare-btn">Add</button>
                        <button className="compare-btn" onClick={() => navigate(`/pokemon/${pokemon?.id}`)}>View</button>
                        <button className="compare-btn" onClick={()=>dispatch(removeFromCompare({id:pokemon.id}))}>Remove</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompareContainer;
