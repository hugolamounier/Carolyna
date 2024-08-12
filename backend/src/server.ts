import express, { Request, Response } from "express";
import * as yup from "yup";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json())

const port = process.env.PORT;

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const signUpSchema = yup.object().shape({
  nome: yup.string().required().min(10).max(100),
  dataNascimento: yup.date().required().max(new Date()),
  nomeMae: yup.string().required().min(10).max(100),
  senha: yup.string().required().min(10).max(30),
  confirmarSenha: yup
    .string()
    .required()
    .oneOf([yup.ref("senha"), null], "As senhas não conferem"),
});

app.post("/usuario/criar", async (req: Request, res: Response) => {
  try {
    const validData = await signUpSchema.validate(req.body, {
      abortEarly: false,
    });

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const [result] = await db.execute(
      "INSERT INTO users (nome, dataNascimento, nomeMae, senha) VALUES (?, ?, ?, ?)",
      [
        validData.nome,
        validData.dataNascimento,
        validData.nomeMae,
        hashPassword,
      ],
    );

    res
      .status(200)
      .json({ message: "Cadastro realizado com sucesso!", data: validData });
  } catch (err: any) {
    res.status(400).json({
      message: "Erro de validação",
      errors: err.errors,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
