import { TPokemonType } from "@/interfaces";
import { FlexBox } from "@/components";

import styled from "styled-components";

interface TAtomPokemonType {
  type: TPokemonType;
}

export const Container = styled(FlexBox)`
  max-width: 20%;
  @media (max-width: 1024px) {
    max-width: 30%;
  }
  @media (max-width: 768px) {
    max-width: 40%;
  }
  @media (max-width: 480px) {
    max-width: 100%;
  }
  background-color: ${(props) => props?.theme?.colors?.neutral?.pure};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  padding: 10px;
  height: 320px;
`;

export const PokemonSpot = styled(FlexBox)<TAtomPokemonType>`
  background-color: ${(props) => props?.theme?.colors?.types?.[props?.type]};
  border-radius: 100%;
  width: 160px;
  height: 160px;
`;

export const PokemonSprite = styled.img`
  height: 200px;
  width: 200px;
`;

export const PokemonText = styled.span<TAtomPokemonType>`
  color: ${(props) => props?.theme?.colors?.types?.[props?.type]};
  font-size: 1.25em;
  font-weight: bold;
  text-transform: capitalize;
`;
