import { atomPokemon } from "@/store/atoms";
import { selectorPokemonInfo } from "@/store/selectors";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

export const Card = () => {
  const { id } = useParams<{ id: string }>();

  const [_, setPokemon] = useRecoilState(atomPokemon);

  useEffect(() => {
    if (!id) return;
    setPokemon(id);
  }, [id]);

  const pokemonInfo = useRecoilValueLoadable(selectorPokemonInfo);

  return (
    <div>
      <pre>{JSON.stringify(pokemonInfo, null, 2)}</pre>
    </div>
  );
};
