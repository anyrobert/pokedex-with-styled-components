import { debounce } from "@/helpers";
import { atomPokemon } from "@/store/atoms";
import { selectorPokemonInfo } from "@/store/selectors";
import { ChangeEventHandler } from "react";

import { Outlet, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = debounce(
    (e) => navigate(`/${e.target.value}`)
  );

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
      <Outlet />
    </div>
  );
};
