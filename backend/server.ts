import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as yup from "yup";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables from .env file if present
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

// MySQL connection setup using environment variables
const db = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "your_username",
  password: process.env.MYSQL_PASSWORD || "your_password",
  database: process.env.MYSQL_DATABASE || "your_database",
});

// Validation schema using yup
const signUpSchema = yup.object().shape({
  nome: yup.string().required().min(10).max(100),
  dataNascimento: yup.date().required().max(new Date()),
  nomeMae: yup.string().required().min(10).max(100),
  senha: yup.string().required().min(10).max(30),
  confirmarSenha: yup
    .string()
    .required()
    .oneOf([yup.ref("senha"), null], "As senhas não conferem"),
  aceiteTermos: yup
    .boolean()
    .oneOf([true], "Você deve aceitar os termos de uso"),
});

// Sign-up route
app.post("/signup", async (req: Request, res: Response) => {
  try {
    // Validate the incoming data
    const validData = await signUpSchema.validate(req.body, {
      abortEarly: false,
    });

    // Hash the password
    const hashedPassword = await bcrypt.hash(validData.senha, 10);

    // Insert the new user into the database
    const [result] = await db.execute(
      "INSERT INTO users (nome, dataNascimento, nomeMae, senha) VALUES (?, ?, ?, ?)",
      [
        validData.nome,
        validData.dataNascimento,
        validData.nomeMae,
        hashedPassword,
      ],
    );

    res
      .status(200)
      .json({ message: "Cadastro realizado com sucesso!", data: validData });
  } catch (err: any) {
    // Return validation errors
    res.status(400).json({
      message: "Erro de validação",
      errors: err.errors,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
