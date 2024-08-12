import express, { Request, Response } from "express";
import * as yup from "yup";
import mysql, {ResultSetHeader, RowDataPacket} from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors({
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all methods
  allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json())

const port = process.env.PORT || 5000;

console.log(process.env);
console.log(process.env.MYSQL_HOST);

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

    const hashPassword = await bcrypt.hash(validData.senha, 10);

    const [result] = await db.execute<ResultSetHeader>(
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
      .json({ message: "Cadastro realizado com sucesso!", data:  result.insertId });
  } catch (err: any) {
    res.status(400).json(err);
  }
});

app.delete("/usuario/:id", async (req: Request, res: Response) => {
  try {
    const [result] = await db.execute<ResultSetHeader>("DELETE FROM users WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Usuário não encontrado" });
    } else {
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar usuário", error: err });
  }
});

app.get("/usuario/:id", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute<RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      res.status(404).json({ message: "Nenhum usuário encontrado" });
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar usuário", error: err });
  }
});

app.put("/usuario/:id", async (req: Request, res: Response) => {
  try {
    const validData = await signUpSchema.validate(req.body, {
      abortEarly: false,
    });

    const hashPassword = await bcrypt.hash(req.body.senha, 10);

    const [result] = await db.execute<ResultSetHeader>(
        "UPDATE users SET nome = ?, dataNascimento = ?, nomeMae = ?, senha = ? WHERE id = ?",
        [
          validData.nome,
          validData.dataNascimento,
          validData.nomeMae,
          hashPassword,
          req.params.id,
        ],
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Usuário não encontrado" });
    } else {
      res.status(200).json({ message: "Usuário atualizado com sucesso", data: validData });
    }
  } catch (err: any) {
    res.status(400).json({ message: "Erro de validação", errors: err.errors});
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
