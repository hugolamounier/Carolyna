import { Usuario } from "../../tipos/Usuario";
import { useNavigate } from "react-router-dom";

interface IUsuarioController {
  onSubmit: (values: FormData) => Promise<void>;
  getUsuario: (id: string) => Promise<Usuario | undefined>;
  deleteUsuario: (id: string) => Promise<void>;
}

export interface FormData {
  nome: string;
  dataNascimento: string;
  nomeMae: string;
  senha: string;
  confirmarSenha: string;
  aceiteTermos: boolean;
}

const useUsuarioController = (): IUsuarioController => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const navigate = useNavigate();

  const onSubmit = async (values: FormData) => {
    console.log(12323213);
    try {
      const response = await fetch(`${apiUrl}/usuario/criar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate(`/usuario/${data.data}`);
      } else {
        const errorData = await response.json();
        console.error("Validation errors:", errorData.errors);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getUsuario = async (id: string): Promise<Usuario | undefined> => {
    const response = await fetch(`${apiUrl}/usuario/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      return data[0];
    }

    return undefined;
  };

  const deleteUsuario = async (id: string) => {
    await fetch(`${apiUrl}/usuario/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return { onSubmit, getUsuario, deleteUsuario };
};

export default useUsuarioController;
