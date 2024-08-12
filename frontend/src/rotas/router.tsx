import { createBrowserRouter } from "react-router-dom";
import CriarUsuario from "../paginas/Usuario/Criar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CriarUsuario />,
    index: true,
  },
]);
