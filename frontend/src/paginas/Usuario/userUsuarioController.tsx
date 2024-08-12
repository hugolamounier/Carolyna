interface IUsuarioController {
  onSubmit: (values: FormData) => Promise<void>;
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
  const onSubmit = async (values: FormData) => {
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);
      } else {
        const errorData = await response.json();
        console.error("Validation errors:", errorData.errors);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return { onSubmit };
};

export default useUsuarioController;
