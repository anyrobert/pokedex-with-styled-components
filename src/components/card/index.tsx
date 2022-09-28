import * as Atom from "./atoms";
import { FlexBox } from "@/components";
import { TPokemonType } from "@/interfaces";

type Props = {
  preview: string;
  name: string;
  image: string;
  type: TPokemonType;
  id: string;
};

export const Card = ({ preview, type, name, image, id }: Props) => {
  return (
    <Atom.Container
      gap="xs"
      align="center"
      justify="space-between"
      direction="column"
    >
      <FlexBox align="center" justify="flex-end" direction="row">
        <Atom.PokemonText type={type}>#{id}</Atom.PokemonText>
      </FlexBox>
      <Atom.PokemonSpot
        type={type}
        align="center"
        justify="center"
        direction="column"
      >
        <Atom.PokemonSprite src={image} alt={name} />
      </Atom.PokemonSpot>
      <FlexBox align="center" justify="space-between" direction="row">
        <Atom.PokemonText type={type}>{name}</Atom.PokemonText>
        {preview && <img src={preview} alt="" />}
      </FlexBox>
    </Atom.Container>
  );
};
