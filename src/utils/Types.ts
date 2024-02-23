export interface AppTypeInitialState {}

export interface PokemonTypeInitialState {
    allPokemon: undefined | genericPokemonType[];
    randomPokemons: undefined | generatedPokemonType[];
}

export interface genericPokemonType {
    name: string;
    url: string; 
}

export interface generatedPokemonType {
    name: string;
    id: number;
    image: string;
    spriteImage: string;
    types: pokemonTypeInterface[];
}

export interface pokemonTypeInterface {
    [key: string]: {
        image: string;
        resistance: string[];
        strength: string[];
        vulnerable: string[];
        weakness: string[];
    };
}

export interface userPokemonsType extends generatedPokemonType {
    firebaseId?: string;

}