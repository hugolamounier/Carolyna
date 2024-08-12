import React, { ReactElement, useState } from "react";
import { Form, Field } from "react-final-form";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import useUsuarioController, { FormData } from "./userUsuarioController";

const CriarUsuario = (): ReactElement => {
  const { onSubmit } = useUsuarioController();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = yup.object().shape({
    nome: yup
      .string()
      .required("Nome Completo é obrigatório")
      .min(10, "O nome deve ter no mínimo 10 caracteres")
      .max(100, "O nome deve ter no máximo 100 caracteres"),
    dataNascimento: yup
      .date()
      .required("Data de nascimento é obrigatória")
      .max(new Date(), "A data de nascimento não pode ser no futuro"),
    nomeMae: yup
      .string()
      .required("Nome da mãe é obrigatório")
      .min(10, "O nome deve ter no mínimo 10 caracteres")
      .max(100, "O nome deve ter no máximo 100 caracteres"),
    senha: yup
      .string()
      .required("Senha é obrigatória")
      .min(10, "A senha deve ter no mínimo 10 caracteres")
      .max(30, "A senha deve ter no máximo 30 caracteres"),
    confirmarSenha: yup
      .string()
      .oneOf([yup.ref("senha")], "As senhas não conferem")
      .required("A confirmação de senha é obrigatória"),
  });

  const validate = (values: FormData) => {
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (err: any) {
      return err.inner.reduce((errors: any, currentError: any) => {
        errors[currentError.path] = currentError.message;
        return errors;
      }, {});
    }
  };

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
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field name="nome">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        autoComplete="name"
                        required
                        fullWidth
                        id="nome"
                        label="Nome Completo"
                        error={meta.touched && meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : null
                        }
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field name="dataNascimento">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        required
                        fullWidth
                        type="date"
                        id="dataNascimento"
                        label="Data de nascimento"
                        autoComplete="bday"
                        InputLabelProps={{ shrink: true }}
                        error={meta.touched && meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : null
                        }
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field name="nomeMae">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        required
                        fullWidth
                        id="nomeMae"
                        label="Nome da mãe"
                        error={meta.touched && meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : null
                        }
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field name="senha">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        required
                        fullWidth
                        name="senha"
                        label="Senha"
                        type={showPassword ? "text" : "password"}
                        id="senha"
                        autoComplete="new-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="mostrar/ocultar senha"
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={meta.touched && meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : null
                        }
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field name="confirmarSenha">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        required
                        fullWidth
                        name="confirmarSenha"
                        label="Confirmar Senha"
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmarSenha"
                        autoComplete="new-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="mostrar/ocultar senha"
                                onClick={() =>
                                  setShowConfirmPassword((prev) => !prev)
                                }
                              >
                                {showConfirmPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={meta.touched && meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : null
                        }
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <Button
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </Button>
            </Box>
          )}
        />
      </Box>
    </Container>
  );
};

export default CriarUsuario;
