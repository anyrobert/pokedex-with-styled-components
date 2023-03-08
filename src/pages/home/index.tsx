import {
  Card,
  Container,
  FlexBox,
  Input,
  Loader,
  PokedexView,
} from "@/components";
import PokemonsSection from "@/components/pokemon-list";
import { debounce } from "@/helpers";
import {
  atomPokemonFetch,
  atomPokemons,
  atomPokemonOffset,
  atomPokemonSearch,
} from "@/store/atoms";
import {
  selectorFetchPokemons,
  selectorPokemon,
  selectorPokemons,
} from "@/store/selectors";
import { ChangeEventHandler, useEffect, useMemo } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";

export const Home = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemonSearch, setPokemonSearch] = useRecoilState(atomPokemonSearch);
  const setFetchPokemons = useSetRecoilState(atomPokemonFetch);
  const [offset, setOffset] = useRecoilState(atomPokemonOffset);
  const [pokemons, setPokemons] = useRecoilState(atomPokemons);
  const retryFetchPokemons = useRecoilRefresher_UNSTABLE(selectorFetchPokemons);

  const navigate = useNavigate();
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = debounce(
    (e) => {
      const formattedValue = e.target.value.toLowerCase().trim();
      setPokemonSearch(formattedValue);
      navigate(`/${formattedValue}`);
    }
  );

  useEffect(() => {
    if (!id) return;
    setPokemonSearch(id);
  }, []);

  const pokemonLoadable = useRecoilValueLoadable(selectorPokemon);
  const pokemonsLoadable = useRecoilValueLoadable(selectorPokemons);
  const fetchPokemonsLoadable = useRecoilValueLoadable(selectorFetchPokemons);

  useEffect(() => {
    if (
      fetchPokemonsLoadable.state !== "hasValue" ||
      !fetchPokemonsLoadable.contents
    )
      return;

    setFetchPokemons(fetchPokemonsLoadable.contents);
  }, [fetchPokemonsLoadable.contents, fetchPokemonsLoadable.state]);

  useEffect(() => {
    if (pokemonsLoadable.state !== "hasValue" || !pokemonsLoadable.contents)
      return;

    setPokemons([...pokemons, ...pokemonsLoadable.contents]);
  }, [pokemonsLoadable.state, pokemonsLoadable.contents]);

  const disabledFetchMore = useMemo(() => {
    return (
      fetchPokemonsLoadable.state === "loading" ||
      fetchPokemonsLoadable.state === "hasError" ||
      pokemonsLoadable.state === "loading" ||
      pokemonsLoadable.state === "hasError"
    );
  }, [fetchPokemonsLoadable.state, pokemonsLoadable.state]);

  const fetchError = useMemo(
    () =>
      fetchPokemonsLoadable.state === "hasError" ||
      pokemonsLoadable.state === "hasError",
    []
  );

  const isLoadingSingle = pokemonLoadable.state === "loading";
  const isLoadingList = pokemonsLoadable.state === "loading";
  const hasFoundPokemon =
    pokemonLoadable.state !== "loading" &&
    pokemonLoadable.state !== "hasError" &&
    pokemonLoadable.contents;

  return (
    <Container>
      <FlexBox align="center" justify="center" direction="column" gap="xxs">
        <Input
          type="text"
          onChange={handleInputChange}
          defaultValue={pokemonSearch}
        />
        <FlexBox align="flex-start" direction="row" gap="xxs" justify="center">
          {isLoadingSingle && <Loader />}
          {hasFoundPokemon && (
            <Card
              preview={
                pokemonLoadable.contents.sprites?.versions?.["generation-v"]?.[
                  "black-white"
                ]?.animated?.front_default
              }
              id={pokemonLoadable.contents.id}
              type={pokemonLoadable.contents.types[0].type.name}
              name={pokemonLoadable.contents.name}
              image={
                pokemonLoadable.contents.sprites.other?.dream_world
                  ?.front_default ||
                pokemonLoadable.contents.sprites.other?.["official-artwork"]
                  ?.front_default
              }
            />
          )}
        </FlexBox>
      </FlexBox>
      <PokemonsSection
        pokemons={pokemons}
        disabledFetch={disabledFetchMore}
        hasErrors={fetchError}
        loading={isLoadingList}
        retryFetch={retryFetchPokemons}
      />
    </Container>
  );
};
