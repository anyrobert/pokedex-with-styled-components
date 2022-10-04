import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  margin-block: ${(props) => props?.theme?.spacing?.[`xxs`]};
  padding-block: .25em;
  font-size: 1.25em;
  max-width: 350px;
`;
