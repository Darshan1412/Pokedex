export interface AppTypeInitialState {
  toasts: string[];
  userInfo: undefined | { email: string };
  currentPokemonTab: string;
  isLoading: boolean;
}

export interface currentPokemonType {
  id: number;
  name: string;
  types: pokemonTypeInterface[];
  image: string;
  stats: pokemonStatsType[];
  encounters: string[];
  evolution: { level: number; pokemon: { name: string; url: string } }[];
  pokemonAbilities: { abilities: string[]; moves: string[] };
  evolutionLevel: number
}

export interface PokemonTypeInitialState {
  allPokemon: undefined | genericPokemonType[];
  randomPokemons: undefined | generatedPokemonType[];
  compareQueue: generatedPokemonType[];
  userPokemons: userPokemonsType[];
  currentPokemon: currentPokemonType | undefined;
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
  spriteShinyImage: string;
  shinyImage: string;
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

export type pokemonStatType =
  | "vulnerable"
  | "weakness"
  | "strength"
  | "resistance";

export interface pokemonStatsType {
  name: string;
  value: string;
}
