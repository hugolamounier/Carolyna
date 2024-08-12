import React from 'react';
import {RouterProvider} from "react-router-dom";
import {router} from "./rotas/router";
import {createTheme, ThemeProvider} from "@mui/material";

function App() {
  const defaultTheme = createTheme();

  return <ThemeProvider theme={defaultTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>;
}

export default App;
