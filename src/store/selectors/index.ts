import { requester } from "@/services/pokemon-api";
import { selector } from "recoil";
import { atomPokemon } from "../atoms";

const httpClient = requester({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const selectorPokemonInfo = selector({
  key: "selectorPokemonInfo",
  get: async ({ get }) => {
    const pokemon = get(atomPokemon);
    if (!pokemon) return;
    const { data } = await httpClient.get(
      `pokemon/${pokemon.toLowerCase().trim()}`
    );

    return data;
  },
});
