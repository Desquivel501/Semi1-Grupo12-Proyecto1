import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login_background from "../../assets/login_background_dark.png";
import { alpha, styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Swal from 'sweetalert2'
import { useContext } from "react";
import { sesionContext } from "../../context/SessionContext";

export default function Login() {
  const [mensaje, setMensaje] = useState({ mensaje: "", tipo: "" });
  const navigate = useNavigate();
  const { login } = useContext(sesionContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const correo = data.get("email")
    
    const email_pattern = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g
    
    if(!email_pattern.test(correo)){
      Swal.fire({
        color: '#fff',
        background: '#1f1f1f',
        icon: 'error',
        title: 'Oops...',
        text: "Correo electronico no valido.",
      })
      return
    }
    
    const mensaje = await login({
      email: data.get("email"),
      password: data.get("password"),
    });

    console.log(mensaje)

    if (mensaje.TYPE == "SUCCESS") {
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!'
      }).then((result) => {
        if(result.isConfirmed){
          navigate("/");
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje.MENSAJE,
      })
    }

    event.target.reset();
  };

  const customTheme = createTheme({
    palette: {
      background: {
        default: "#f8ede9",
      },
    },
  });

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#fff',
    },
    '& label': {
        color: '#fff',
    },

    '& .MuiInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },
  });
  

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={window.innerHeight}
        sx={{ backgroundColor: "rgb(0,0,0,9);", ml:"-330px", mt:"-30px" ,border:0, borderColor:"#fff",
            backgroundImage: `url(${login_background})`,
        }}
      >
        <Grid
          container
          component="main"
          sx={{ width: "80vw", height: "80vh", pt: 4 }}
          justifyContent={"center"}
        >
          <CssBaseline />

         

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            alignItems="center"
            justifyContent="center"
            sx={{
                borderRadius: 8,
                backgroundColor: "#1f1f1f",
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: 1,
                
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#fff",
                  textDecoration: "none",
                  width: "100%",
                  mb:2
                }}
              >
                Iniciar Sesión
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <CssTextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo Electronico"
                  name="email"
                  autoFocus
                  sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                />

                <CssTextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "#353535", '&:hover': { backgroundColor: '#626262' } }}
                >
                  Log In
                </Button>
                {mensaje.tipo != "" &&
                  (
                    <p
                      classNameName="mensaje"
                      style={{
                        backgroundColor: mensaje.tipo == "Error"
                          ? "#c00"
                          : "#080",
                      }}
                    >
                      {mensaje.mensaje}
                    </p>
                  )}
                <Grid container>
                  <Grid item>
                    <Link
                      href="/Signup"
                    //   href="/RegistroCliente"
                      variant="body2"
                    //   style={{ color: "#626262", borderBottomColor: "#626262", '&:hover': { backgroundColor: '#626262' }}}
                    >
                      {"¿No tienes una cuenta? ¡Registrate!"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}