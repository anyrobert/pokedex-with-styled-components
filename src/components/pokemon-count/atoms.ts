import styled from "styled-components";
import { FlexBox } from "@/components";

export const PokemonCountContainer = styled(FlexBox)`
  margin-top: ${(props) => props.theme.spacing.xs};
  font-weight: 600;
  font-size: 1.25em;
`;
