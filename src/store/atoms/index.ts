import { IPokemon, IPokemonFetch } from "@/interfaces";
import { atom } from "recoil";

export const atomPokemonSearch = atom({
  key: "atomPokemonSearch",
  default: "",
});

export const atomPokemonFetch = atom<IPokemonFetch[]>({
  key: "atomPokemonFetch",
  default: [],
});

export const atomPokemonOffset = atom({
  key: "atomPokemonOffset",
  default: 0,
});

export const atomPokemons = atom<IPokemon[]>({
  key: "atomPokemons",
  default: [],
});
