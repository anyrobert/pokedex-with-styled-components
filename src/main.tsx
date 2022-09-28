import "./index.css";
import { router } from "./router";
import { ResetCss, dark } from "./theme";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={dark()}>
      <RecoilRoot>
        <ResetCss />
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
  </StrictMode>
);
