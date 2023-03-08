import { IPokemon, IPokemonFetch } from "@/interfaces";
import { requester } from "@/services/pokemon-api";
import { selector } from "recoil";
import {
  atomPokemonFetch,
  atomPokemonOffset,
  atomPokemonSearch,
} from "../atoms";

const httpClient = requester({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const selectorFetchPokemons = selector<IPokemonFetch[]>({
  key: "selectorFetchPokemons",
  get: async ({ get }) => {
    const offSet = get(atomPokemonOffset);
    const { data } = await httpClient.get(`pokemon?offset=${offSet}&limit=20`);

    return data.results || [];
  },
});

export const selectorPokemons = selector<IPokemon[]>({
  key: "selectorPokemons",
  get: async ({ get }) => {
    const pokemonFetch = get(atomPokemonFetch);

    if (pokemonFetch.length === 0) return [];

    const list = await Promise.all(
      pokemonFetch.map(async (pokemon) => {
        const { data } = await httpClient.get<IPokemon>(pokemon.url);
        return data;
      })
    );

    return list;
  },
});

export const selectorPokemon = selector<IPokemon>({
  key: "selectorPokemon",
  get: async ({ get }) => {
    const pokemon = get(atomPokemonSearch);
    if (!pokemon) return;
    const { data } = await httpClient.get(`pokemon/${pokemon}`);

    return data;
  },
});
