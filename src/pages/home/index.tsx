import { Card, Container, FlexBox, Input, Loader } from "@/components";
import { debounce } from "@/helpers";
import { atomPokemon } from "@/store/atoms";
import { selectorPokemonInfo } from "@/store/selectors";
import { ChangeEventHandler, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

export const Home = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useRecoilState(atomPokemon);
  const navigate = useNavigate();
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = debounce(
    (e) => {
      const formattedValue = e.target.value.toLowerCase().trim();
      setPokemon(formattedValue);
      navigate(`/${formattedValue}`);
    }
  );

  useEffect(() => {
    if (!id) return;
    setPokemon(id);
  }, []);

  const pokemonInfo = useRecoilValueLoadable(selectorPokemonInfo);
  const isLoading = pokemonInfo.state === "loading";
  const hasFoundPokemon =
    pokemonInfo.state !== "loading" &&
    pokemonInfo.state !== "hasError" &&
    pokemonInfo.contents;
  return (
    <Container>
      <FlexBox align="center" justify="center" direction="column" gap="xxs">
        <Input
          type="text"
          onChange={handleInputChange}
          defaultValue={pokemon}
        />
        <FlexBox align="flex-start" direction="row" gap="xxs" justify="center">
          {isLoading && <Loader />}
          {hasFoundPokemon && (
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
      </FlexBox>
    </Container>
  );
};
