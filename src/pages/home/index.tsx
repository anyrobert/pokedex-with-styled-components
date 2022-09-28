import { Card, Container, FlexBox } from "@/components";
import { debounce } from "@/helpers";
import { atomPokemon } from "@/store/atoms";
import { selectorPokemonInfo } from "@/store/selectors";
import { ChangeEventHandler, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

export const Home = () => {
  const { id } = useParams<{ id: string }>();
  const [_, setPokemon] = useRecoilState(atomPokemon);
  const navigate = useNavigate();
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = debounce(
    (e) => {
      setPokemon(e.target.value);
      navigate(`/${e.target.value}`);
    }
  );

  useEffect(() => {
    if (id) {
      setPokemon(id);
    }
  }, []);

  const pokemonInfo = useRecoilValueLoadable(selectorPokemonInfo);

  return (
    <Container>
      <FlexBox align="flex-start" justify="center" direction="column" gap="xxs">
        <input type="text" onChange={handleInputChange} />
        {pokemonInfo.state === "loading" && <div>Loading...</div>}
        {pokemonInfo.state !== "loading" &&
          pokemonInfo.state !== "hasError" &&
          pokemonInfo.contents && (
            <Card
              preview={
                pokemonInfo.contents.sprites.versions["generation-v"][
                  "black-white"
                ].animated.front_default
              }
              id={pokemonInfo.contents.id}
              type={pokemonInfo.contents.types[0].type.name}
              name={pokemonInfo.contents.name}
              image={
                pokemonInfo.contents.sprites.other.dream_world.front_default
              }
            />
          )}
      </FlexBox>
    </Container>
  );
};
