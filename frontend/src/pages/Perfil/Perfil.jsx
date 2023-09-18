import React, { Component } from 'react';
import { ColorExtractor } from 'react-color-extractor'
import './Perfil.css';
import { Button, TextField, CssBaseline, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alpha, styled } from '@mui/material/styles';

import Swal from 'sweetalert2'
import { useContext } from "react";
import { sesionContext } from "../../context/SessionContext";
import { useState, useEffect } from 'react';

import { getDataAuth } from '../../api/api';


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

    const miCampo = React.createRef();
    const fr = new FileReader();

    const [state, setState] = useState({
        nombre: '', //aca se guarda el nuevo nombre
        nombretemp: 'Kevin', // aca se guarda el nombre que se recibe desde la base de datos 
        apellido: '', // aca se guarda el nuevo apellido 
        apellidotemp: 'Garcia', // aca se guarda el apellido que se recibe desde la base de datos 
        tipo_usuario: 'Administrador', // aca se guarda el tipo que se recibe desde la base de datos 
        correo: 'demo@correo.com', // aca se guarda el correo que se recibe desde la base de datos 
        foto: "https://static.wikia.nocookie.net/pokemon-pasta/images/4/4f/Likeaboss.jpg/revision/latest?cb=20130402202456", // aca se guarda la foto que se recibe desde la base de datos 
        contrasena: '',
        nueva_contrasena: '',
        verificar_contrasena: '',
        preview: "https://t4.ftcdn.net/jpg/05/63/85/35/360_F_563853540_ULfiVXqhEzaNgPrIvr0QQV8ibBnhDUP6.jpg",
        color: ''
    })
    const [count, setCount] = useState(0);

    useEffect(() => {
        const endpoint = `/api/users/${window.localStorage.getItem("id")}`;
        getDataAuth({endpoint})
        .then(data => {
            setState({
                ...state, 
                nombre: data.firstname,
                nombretemp:  data.firstname, 
                apellido: data.lastname,
                apellidotemp: data.lastname, 
                tipo_usuario: (data.role == 1 ? 'Administrador' : 'Usuario'), 
                correo: data.email, 
                foto: data.photo,
                contrasena: data.password,
            })
        })
        .catch(err => console.log(err))
        setCount(count + 1);
    }, []);



    const inputChangedHandler1 = (e) => {
        //cuando ingresa el nombre en el input
        setState({ ...state, nombre: e.target.value })

    }

    const inputChangedHandler2 = (e) => {
        //cuando ingresa el apellido en el input
        setState({...state, apellido: e.target.value })

    }

    const inputChangedHandler3 = (e) => {
        //cuando ingresa la contraseña actual, aca se debe encriptar contraseña para validar en el backend 
        setState({...state, contrasena: e.target.value})
    }

    const inputChangedHandlernuevaContrasena = (e) => {
        //cuando ingresa la nueva constraseña, aca se debe encriptar contrasena en el backend debe hacer la validadcion
        setState({...state, nueva_contrasena: e.target.value})
    }

    const inputChangedHandlerverificarContrasena = (e) => {
        //cuando ingresa otra vez la nueva contraseña, aca se debe encriptar contrasena en el backend debe hacer validacion
        setState({...state, verificar_contrasena: e.target.value})
    }

    const onChange =(e) => {
        // nueva foto 
        setState({...state, preview : URL.createObjectURL(e.target.files[0])})  
    }

    const guardarfoto = (e) =>{
        setState({...state, foto : state.preview})
        // setState({preview : ''})
    }

    const actualizar_datos = (e) =>{
        //campos que se enviara a la base de datos para actualizar informacion 
        // state.nombre, state.apellidos, state.foto
        if(state.contrasena === state.verificar_contrasena){
            console.log("contraseñas iguales")
            console.log({
                nombre: state.nombretemp,
                apellido: state.apellidotemp,
                foto: state.foto,
            })
        }
    }

    const actuazlizar_contraseña = (e) => {
        // campos que se enviara a la base de datos para actualizar contraseña, alla debe hacer las validaciones con las contraseñans encriptadas 
        // state.contrasena, state.verificar_contrasena, state.verificar_contrasena
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
{/* 
                                            <hr className="mt-0 mb-4" />
                                            <div className="col-7 mb-3">
                                                <h5>Actualizar Contraseña</h5>
                                                <Button className="button my-3" data-mdb-toggle="modal" data-mdb-target="#exampleModal2" 
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
                                            </div> */}

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
                             <input type="file" name="cover" accept='.png, .jpg, .jpeg'
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

                        <form>

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

                        </form>

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
                        
                        <Button className="button my-3" onClick={actualizar_datos} data-mdb-dismiss="modal"
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
        </div></>



    )
    
}