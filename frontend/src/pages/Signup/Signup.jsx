import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login_background from "../../assets/login_background_dark.png";
import { alpha, styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Swal from 'sweetalert2'
import { useContext } from "react";
import { sesionContext } from "../../context/SessionContext";

export default function Signup() {
  const navigate = useNavigate();
  const { registro } = useContext(sesionContext);

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
    } else {
      console.log(data)
    }
    
    const mensaje = await registro(data);

    console.log(mensaje)

    if(mensaje.TYPE == "SUCCESS"){
      Swal.fire({
        icon: 'success',
        title: 'Creado',
        text: mensaje.MESSAGE,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje.MESSAGE,
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
            backgroundImage: `url(${login_background})`
        }}
      >
        <Grid
          container
          component="main"
          sx={{ width: "80vw", height: "80vh", pt: 4, mt:"-100px" }}
          justifyContent={"center"}
        >
          <Grid
            item
            xs={window.innerWidth < 1500 ? 8 : 6}
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
                my: (window.innerWidth < 1500 ? 3 : 0),
                mx: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: 1,
                height: "100%"
              }}
              maxHeight={window.innerHeight}
              onSubmit={handleSubmit}
              component="form"
              justifyContent={"center"}
            >

                <Grid
                container
                spacing={3}
                // sx={{ width: "80vw", height: "80vh", pt: 4, mt:"-100px" }}
                alignContent={"center"}
                justifyContent={"center"}
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
                        }}
                        
                    >
                        Crear Usuario
                    </Typography>

                    <Grid
                        item
                        xs={6}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <CssTextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nombre"
                        name="name"
                        autoFocus
                        sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <CssTextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Apellido"
                        name="lastname"
                        sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                        />
                    </Grid>

                    
                    <Grid
                        item
                        xs={6}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <CssTextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo Electronico"
                        name="email"
                        sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        alignItems="center"
                        justifyContent="center"
                    >
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
                    </Grid>


                    <Grid
                        item
                        xs={6}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            sx={{
                                mr: 2,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "#fff",
                                textDecoration: "none",
                                width: "100%",
                                mt:1
                            }}
                        >
                            Fecha de Nacimiento*
                        </Typography>

                        <CssTextField
                          type="date"
                          margin="normal"
                          required
                          fullWidth
                          id="birthDate"
                          name="birthDate"
                          format="DD/MM/YYYY"
                          sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                          />
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            sx={{
                                mr: 2,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "#fff",
                                textDecoration: "none",
                                width: "100%",
                                mt:1
                            }}
                        >
                            Foto de perfil*
                        </Typography>

                        <Button
                          component="label"
                          variant="contained"
                          startIcon={<CloudUploadIcon />}
                          fullWidth
                          height="100%"
                          sx={{ mt: 3, mb: 2, bgcolor: "#353535", '&:hover': { backgroundColor: '#626262' } }}
                        >
                          <input
                            type="file"
                            id="file"
                            hidden
                            accept=".jpg,.jpeg,.png"
                            name="avatar"
                          />
                          Subir Imagen
                        </Button>

                    </Grid>

                    <Grid
                        item
                        xs={8}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 4, bgcolor: "#353535", '&:hover': { backgroundColor: '#626262' } }}
                        >
                        Registrarse
                        </Button>
                    </Grid>
                    
                </Grid>
            </Box>
              

          </Grid>
        </Grid>
      </Box>
      <CssBaseline />
    </ThemeProvider>
  );
}