import React, { Component } from 'react';
import { ColorExtractor } from 'react-color-extractor'
import './Perfil.css';
import { Button, TextField, CssBaseline, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alpha, styled } from '@mui/material/styles';

import Swal from 'sweetalert2'
import { sesionContext } from "../../context/SessionContext";
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { getDataAuth, patchData } from '../../api/api';


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


export default function Perfil() {

    const navigate = useNavigate();
    const { logout, login } = useContext(sesionContext);

    const [state, setState] = useState({
        nombre: '', 
        nombretemp: '',
        apellido: '',
        apellidotemp: '', 
        tipo_usuario: '', 
        correo: '', 
        foto: 'https://ih0.redbubble.net/image.1046392278.3346/raf,360x360,075,t,fafafa:ca443f4786.jpg',
        contrasena: '',
        nueva_contrasena: '',
        verificar_contrasena: '',
        preview: 'https://ih0.redbubble.net/image.1046392278.3346/raf,360x360,075,t,fafafa:ca443f4786.jpg',
        color: '#7f7f7f'
    })
    const [count, setCount] = useState(0);



    useEffect(() => {
        const endpoint = `/api/users/${window.localStorage.getItem("id")}`;
        getDataAuth({endpoint})
        .then(data => {
            if(data === undefined){
                logout();
                navigate("/login");
            }
            setState({
                ...state, 
                nombre: data.firstname,
                nombretemp:  data.firstname, 
                apellido: data.lastname,
                apellidotemp: data.lastname, 
                tipo_usuario: (data.role == 0 ? 'Administrador' : 'Usuario'), 
                correo: data.email, 
                foto: data.photo,
                contrasena: data.password,
            })
        })
        .catch(err => console.log(err))
        setCount(count + 1);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const mensaje = await login({
            email: window.localStorage.getItem("id"),
            password: state.verificar_contrasena,
        });

        if(mensaje.TYPE == "SUCCESS"){
            
            data.append('email', window.localStorage.getItem("id"))
            data.append('newEmail', window.localStorage.getItem("id"))
            data.append('password', state.verificar_contrasena)
            data.append('birthDate', '2021-10-10')

            if(data.get('avatar').size == 0){
                data.set('avatar', '')
            }

            let endpoint = `/api/users/`;
            patchData({endpoint, data})
            .then(data => {
                console.log(data)
                if(data.TYPE == "SUCCESS"){
                    Swal.fire({
                        icon: 'success',
                        title: '¡Datos actualizados!',
                        text: 'Se actualizaron los datos correctamente',
                    }).then((result) => {
                        if(result.isConfirmed){
                            window.location.reload(false);
                        }
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.MESSAGE,
                    })
                }
            })


        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Contraseña incorrecta",
            })
        }
    }


    const close_contrasena  = (e) => {
        setState({...state, contrasena: '', nueva_contrasena: '', verificar_contrasena: ''})
    }

    function selectColor(str) {

        if(str === undefined || str === null || str === ''){
            setState({ ...state, color: '#787878' })
            return;
        };

        var whiteLimit = 200, 
            r,g,b;
        
        r = parseInt("0x"+str.substring(1,3));
        g = parseInt("0x"+str.substring(3,5));
        b = parseInt("0x"+str.substring(5,7));
        if(r < whiteLimit || b < whiteLimit || g < whiteLimit) {
            setState({ ...state, color: str })
            return;
        } 
        setState({ ...state, color: '#787878' })
    }

    function changeColor(color, amount) {
        const clamp = (val) => Math.min(Math.max(val, 0), 0xFF)
        const fill = (str) => ('00' + str).slice(-2)
    
        const num = parseInt(color.substr(1), 16)
        const red = clamp((num >> 16) + amount)
        const green = clamp(((num >> 8) & 0x00FF) + amount)
        const blue = clamp((num & 0x0000FF) + amount)
        return '#' + fill(red.toString(16)) + fill(green.toString(16)) + fill(blue.toString(16))
    }


    return (

        <>
        {/* <h1>Mi Perfil</h1> */}

        <Box 
            component="form"
            sx={{ width: '100%' }}
            onSubmit={handleSubmit}
        >

                                
        <section className="vh-170">
            <div className="container pb-3 h-80" style={{maxWidth:'100%'}}>
                <div className="row d-flex justify-content-center align-items-center h-50">
                    <div className="col col-lg-12 mb-4 mb-lg-0">
                        <div className="card mb-3" style={{ borderRadius: '.5rem', backgroundColor:'#1f1f1f'}}>
                            <div className="row g-0" style={{ justifyContent:'center' }}>
                                
                                <div className="col-md-12 text-center text-white pb-4"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', backgroundColor:state.color }}>
                                    <img src={state.foto}
                                        alt="Avatar" className="img-fluid my-5" 
                                        style={{ width: '400px', border:1, borderColor:'#000',
                                                boxShadow: '5px 5px 10px #000000',
                                                margin: '4em', 
                                                borderRadius: '50%',
                                        }} 
                                        onLoad={() => setCount(count + 1)}
                                    />

                                    <ColorExtractor
                                        key={count}
                                        src={state.foto}
                                        getColors={colors => {
                                            console.log(colors)
                                            selectColor(colors[0])
                                        }}
                                    />   

                                    <h3 style={{color:'#fff'}}>Perfil</h3>
                                    <h1>{state.nombre+' '+state.apellido}</h1>
                                    <h4>{state.tipo_usuario}</h4>

                                </div>


                                


                                    <div className="col-md-10">
                                        <div className="row d-flex p-4">
                                            <div className="row pt-1 pb-1">
                                                <h3>Actualizar mis datos</h3>
                                            </div>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1" style={{justifyContent:'center'}}>
                                                <div className="col-5 mb-3">
                                                    <h5>Nombre</h5>

                                                    {/* <input type="text" className="form-control" value={state.nombre} onChange={inputChangedHandler1} name="Nombre" placeholder="Nombre" /> */}

                                                    <CssTextField
                                                        margin="normal"
                                                        fullWidth
                                                        id="name"
                                                        name="name"
                                                        value={state.nombretemp}
                                                        onChange={(e) => setState({...state, nombretemp: e.target.value})}
                                                        sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                                                    />

                                                </div>
                                                <div className="col-5 mb-3">
                                                    <h5>Apellido</h5>
                                                    {/* <input type="text" className="form-control" value={state.apellido} onChange={inputChangedHandler2} name="Apellido" placeholder="Apellido" /> */}
                                                    <CssTextField
                                                        margin="normal"
                                                        fullWidth
                                                        id="lastname"
                                                        name="lastname"
                                                        value={state.apellidotemp}
                                                        onChange={(e) => setState({...state, apellidotemp : e.target.value})}
                                                        sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                                                    />
                                                </div>
                                            </div>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1" style={{justifyContent:'center'}}>
                                                <div className="col-7 mb-3">
                                                    <h5>Correo</h5>
                                                    <p className="text-muted">{state.correo}</p>
                                                </div>

                                                <hr className="mt-0 mb-4" />
                                                <div className="col-7 mb-3">
                                                    <h5>Actualizar Foto de Perfil</h5>
                                                    <Button className="button my-3" data-mdb-toggle="modal" data-mdb-target="#replacePictureModal"
                                                        sx={{
                                                            background:state.color,
                                                            color: '#fff',
                                                            "&:hover": {
                                                                background: changeColor(state.color, -30),
                                                            }
                                                        }}
                                                    >
                                                        Cambiar
                                                    </Button>
                                                </div>
                                                <hr className="mt-0 mb-4" />
                                                <div className="col-7 mb-3">
                                                    <Button 
                                                    
                                                    data-mdb-toggle="modal" data-mdb-target="#confirmModal"
                                                        className="button my-3"
                                                        sx={{
                                                            mx:1,
                                                            background:state.color,
                                                            color: '#fff',
                                                            "&:hover": {
                                                                background: changeColor(state.color, -30),
                                                            }
                                                        }}
                                                    >
                                                        Actualizar Datos
                                                    </Button>

                                                    <Button className="button my-3"
                                                        onClick={() => {
                                                                Swal.fire({
                                                                    title: '¿Estas seguro?',
                                                                    text: "Se cerrará la sesión actual",
                                                                    icon: 'warning',
                                                                    showCancelButton: true,
                                                                    confirmButtonColor: '#9d0000',
                                                                    cancelButtonColor: '#717171',
                                                                    confirmButtonText: 'Cerrar Sesión',
                                                                    cancelButtonText: 'Cancelar'
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        logout();
                                                                        navigate("/");
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        sx={{
                                                            mx:1,
                                                            background:'#9d0000',
                                                            color: '#fff',
                                                            "&:hover": {
                                                                background: "#b03232",
                                                            }
                                                        }}
                                                    >
                                                        Cerrar Sesión
                                                    </Button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

         


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
 


        <div className="modal fade" id="replacePictureModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{background:"#1f1f1f"}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cambiar Fotografia</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center'}}>
                            <img src={state.preview}
                                alt="Avatar" className="img-fluid my-5" style={{ width: '200px' }} />
                             <input type="file" name="avatar" accept='.png, .jpg, .jpeg'
                                onChange= {(e) => {
                                    setState({...state, preview : URL.createObjectURL(e.target.files[0])})
                                }} 
                             />
                        </div>

                        <div className="modal-footer">

                            <Button className="button my-3" data-mdb-dismiss="modal"
                                onClick={() => {
                                    setPreview(song.cover)
                                }}
                                sx={{
                                    mr: 3,
                                    background:"#9d0000",
                                    color: '#fff',
                                    "&:hover": {
                                        background: '#b03232'
                                    }
                                }}
                            >
                                Cancelar
                            </Button>
                            
                            <Button className="button my-3" onClick={() => setState({...state, foto: state.preview})} data-mdb-dismiss="modal"
                                sx={{
                                    background:"#717171",
                                    color: '#fff',
                                    "&:hover": {
                                        background: '#9a9a9a'
                                    }
                                }}
                            >
                                Actualizar
                            </Button>


                        </div> 
                    </div>
                </div>
        </div>


        <div className="modal fade" id="confirmModal" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content" style={{background:"#1f1f1f"}}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ingresar contraseña</h5>
                        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                        <Typography variant="details" noWrap component="div"  align="left" alignSelf={'left'}
                            sx={{ border:0, pb:1, color: '#fff'}}
                        >
                            Confirme su contraseña para guardar los cambios
                        </Typography>

                        <CssTextField
                            margin="normal"
                            fullWidth
                            autoComplete='off'
                            required
                            id="actual"
                            name="actual"
                            type='password'
                            value={state.verificar_contrasena}
                            onChange={(e) => setState({...state, verificar_contrasena: e.target.value})}
                            sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                        />
   
                    </div>

                    <div className="modal-footer">

                        <Button className="button my-3" data-mdb-dismiss="modal" onClick={close_contrasena}
                            sx={{
                                mr: 3,
                                background:"#fff",
                                color: '#000',
                                "&:hover": {
                                    background: changeColor(state.color, 40),
                                }
                            }}
                        >
                            Cancelar
                        </Button>
                        
                        <Button className="button my-3" data-mdb-dismiss="modal"
                            type='submit'
                            sx={{
                                background:state.color,
                                color: '#fff',
                                "&:hover": {
                                    background: changeColor(state.color, -30),
                                }
                            }}
                        >
                            Actualizar
                        </Button>


                    </div>
                </div>
            </div>
        </div>

        </Box>
        
        </>



    )
    
}