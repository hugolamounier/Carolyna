import React, { ReactElement, useEffect, useState } from "react";
import useUsuarioController from "./userUsuarioController";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Usuario } from "../../tipos/Usuario";
import { useNavigate, useParams } from "react-router-dom";
import { People } from "@mui/icons-material";
import moment from "moment";

const VerUsuario = (): ReactElement => {
  const { getUsuario, deleteUsuario } = useUsuarioController();
  const { id } = useParams();
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);
  const navigate = useNavigate();

  const formattedDate =
    moment(usuario?.dataNascimento).format("YYYY-MM-DD") ?? "";

  useEffect(() => {
    (async () => {
      if (id !== undefined) {
        const usuario = await getUsuario(id);
        if (usuario) setUsuario(usuario);
        if (!usuario) navigate("/");
      }
    })();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <People />
        </Avatar>
        <Typography component="h1" variant="h5">
          Visualizar Usuário
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                required
                fullWidth
                id="nome"
                label="Nome Completo"
                value={usuario?.nome}
                InputLabelProps={{ shrink: Boolean(usuario?.nome) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="date"
                id="dataNascimento"
                label="Data de nascimento"
                autoComplete="bday"
                value={formattedDate}
                InputLabelProps={{ shrink: Boolean(usuario?.dataNascimento) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nomeMae"
                label="Nome da mãe"
                value={usuario?.nomeMae}
                InputLabelProps={{ shrink: Boolean(usuario?.nomeMae) }}
              />
            </Grid>
          </Grid>
          <Button
            color="error"
            type="submit"
            fullWidth
            variant="contained"
            onClick={async () => {
              await deleteUsuario(id!);
            }}
            sx={{ mt: 3, mb: 2 }}
          >
            Excluir
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default VerUsuario;
