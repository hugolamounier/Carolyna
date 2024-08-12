import { createBrowserRouter } from "react-router-dom";
import Index from "../paginas";
import CriarUsuario from "../paginas/Usuario/Criar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    index: true,
  },
  {
    path: "usuario/criar",
    element: <CriarUsuario />,
  },
]);
