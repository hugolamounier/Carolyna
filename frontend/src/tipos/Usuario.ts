import moment from "moment";

export type Usuario = {
  nome: string;
  senha: string;
  dataNascimento: moment.Moment;
  nomeMae: string;
};
