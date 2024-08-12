import { createBrowserRouter } from "react-router-dom";
import CriarUsuario from "../paginas/Usuario/Criar";
import VerUsuario from "../paginas/Usuario/Ver";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CriarUsuario />,
    index: true,
  },
  {
    path: "/usuario/criar",
    element: <CriarUsuario />,
  },
  {
    path: "/usuario/:id",
    element: <VerUsuario />,
  },
]);
