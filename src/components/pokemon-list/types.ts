import { IPokemon } from "@/interfaces";

export interface IPokemonsSection {
  pokemons: IPokemon[];
  loading: boolean;
  disabledFetch: boolean;
  hasErrors: boolean;
  retryFetch: () => any;
}
