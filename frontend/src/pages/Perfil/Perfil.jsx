import React, { Component } from 'react';
import { ColorExtractor } from 'react-color-extractor'
import './Perfil.css';
import { Button, TextField, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alpha, styled } from '@mui/material/styles';


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


export default class Perfil extends Component {

    miCampo = React.createRef();
    fr = new FileReader();

    state = {
        nombre: '', //aca se guarda el nuevo nombre
        nombretemp: 'Kevin', // aca se guarda el nombre que se recibe desde la base de datos 
        apellido: '', // aca se guarda el nuevo apellido 
        apellidotemp: 'Garcia', // aca se guarda el apellido que se recibe desde la base de datos 
        tipo_usuario: 'Administrador', // aca se guarda el tipo que se recibe desde la base de datos 
        correo: 'demo@correo.com', // aca se guarda el correo que se recibe desde la base de datos 
        foto: "https://t4.ftcdn.net/jpg/05/63/85/35/360_F_563853540_ULfiVXqhEzaNgPrIvr0QQV8ibBnhDUP6.jpg", // aca se guarda la foto que se recibe desde la base de datos 
        contrasena: '',
        nueva_contrasena: '',
        verificar_contrasena: '',
        preview: "https://t4.ftcdn.net/jpg/05/63/85/35/360_F_563853540_ULfiVXqhEzaNgPrIvr0QQV8ibBnhDUP6.jpg",
        color: '#fff'
    }

    inputChangedHandler1 = (e) => {
        //cuando ingresa el nombre en el input
        this.setState({ nombre: e.target.value })

    }

    inputChangedHandler2 = (e) => {
        //cuando ingresa el apellido en el input
        this.setState({ apellido: e.target.value })

    }

    inputChangedHandler3 = (e) => {
        //cuando ingresa la contraseña actual, aca se debe encriptar contraseña para validar en el backend 
        this.setState({contrasena: e.target.value})
    }

    inputChangedHandlernuevaContrasena = (e) => {
        //cuando ingresa la nueva constraseña, aca se debe encriptar contrasena en el backend debe hacer la validadcion
        this.setState({nueva_contrasena: e.target.value})
    }

    inputChangedHandlerverificarContrasena = (e) => {
        //cuando ingresa otra vez la nueva contraseña, aca se debe encriptar contrasena en el backend debe hacer validacion
        this.setState({verificar_contrasena: e.target.value})
    }

    onChange =(e) => {
        // nueva foto 
        this.setState({preview : URL.createObjectURL(e.target.files[0])})  
    }

    guardarfoto = (e) =>{
        this.setState({foto : this.state.preview})
        // this.setState({preview : ''})
    }

    actualizar_datos = (e) =>{
        //campos que se enviara a la base de datos para actualizar informacion 
        // state.nombre, state.apellidos, state.foto
    }

    actuazlizar_contraseña = (e) => {
        // campos que se enviara a la base de datos para actualizar contraseña, alla debe hacer las validaciones con las contraseñans encriptadas 
        // state.contrasena, state.verificar_contrasena, state.verificar_contrasena
    }

    close_contrasena  = (e) => {
        this.setState({contrasena: '', nueva_contrasena: '', verificar_contrasena: ''})
    }

    selectColor(str) {

        if(str === undefined || str === null || str === ''){
            this.setState({ color: '#787878' })
            return;
        };

        var whiteLimit = 200, 
            r,g,b;
        
        r = parseInt("0x"+str.substring(1,3));
        g = parseInt("0x"+str.substring(3,5));
        b = parseInt("0x"+str.substring(5,7));
        if(r < whiteLimit || b < whiteLimit || g < whiteLimit) {
            this.setState({ color: str })
            return;
        } 
        this.setState({ color: '#787878' })
    }

    changeColor(color, amount) {
        const clamp = (val) => Math.min(Math.max(val, 0), 0xFF)
        const fill = (str) => ('00' + str).slice(-2)
    
        const num = parseInt(color.substr(1), 16)
        const red = clamp((num >> 16) + amount)
        const green = clamp(((num >> 8) & 0x00FF) + amount)
        const blue = clamp((num & 0x0000FF) + amount)
        return '#' + fill(red.toString(16)) + fill(green.toString(16)) + fill(blue.toString(16))
    }

    
    render() {
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
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', backgroundColor:this.state.color }}>
                                        <img src={this.state.foto}
                                            alt="Avatar" className="img-fluid my-5" 
                                            style={{ width: '400px', border:1, borderColor:'#000',
                                                    boxShadow: '5px 5px 10px #000000',
                                                    margin: '4em', 
                                                    borderRadius: '50%',
                                            }} 
                                        />
                                        <ColorExtractor
                                            src={this.state.foto}
                                            getColors={colors => this.selectColor(colors[0])}
                                        />   
                                        <h3 style={{color:'#fff'}}>Perfil</h3>
                                        <h1>{this.state.nombretemp+' '+this.state.apellidotemp}</h1>
                                        <h4>{this.state.tipo_usuario}</h4>

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

                                                    {/* <input type="text" className="form-control" value={this.state.nombre} onChange={this.inputChangedHandler1} name="Nombre" placeholder="Nombre" /> */}

                                                    <CssTextField
                                                        margin="normal"
                                                        fullWidth
                                                        id="name"
                                                        name="name"
                                                        sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                                                    />

                                                </div>
                                                <div className="col-5 mb-3">
                                                    <h5>Apellido</h5>
                                                    {/* <input type="text" className="form-control" value={this.state.apellido} onChange={this.inputChangedHandler2} name="Apellido" placeholder="Apellido" /> */}
                                                    <CssTextField
                                                        margin="normal"
                                                        fullWidth
                                                        id="lastname"
                                                        name="lastname"
                                                        sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                                                    />
                                                </div>
                                            </div>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1" style={{justifyContent:'center'}}>
                                                <div className="col-7 mb-3">
                                                    <h5>Correo</h5>
                                                    <p className="text-muted">{this.state.correo}</p>
                                                </div>
                                                <hr className="mt-0 mb-4" />
                                                <div className="col-7 mb-3">
                                                    <h5>Actualizar Contraseña</h5>
                                                    <Button className="button my-3" data-mdb-toggle="modal" data-mdb-target="#exampleModal2" 
                                                        sx={{
                                                            background:this.state.color,
                                                            color: '#fff',
                                                            "&:hover": {
                                                                background: this.changeColor(this.state.color, -30),
                                                            }
                                                        }}
                                                    >
                                                        Actualizar
                                                    </Button>
                                                </div>
                                                <hr className="mt-0 mb-4" />
                                                <div className="col-7 mb-3">
                                                    <h5>Actualizar Foto de Perfil</h5>
                                                    <Button className="button my-3" data-mdb-toggle="modal" data-mdb-target="#exampleModal"
                                                        sx={{
                                                            background:this.state.color,
                                                            color: '#fff',
                                                            "&:hover": {
                                                                background: this.changeColor(this.state.color, -30),
                                                            }
                                                        }}
                                                    >
                                                        Cambiar
                                                    </Button>
                                                </div>
                                                <hr className="mt-0 mb-4" />
                                                <div className="col-7 mb-3">
                                                    <Button className="button my-3"
                                                        sx={{
                                                            background:this.state.color,
                                                            color: '#fff',
                                                            "&:hover": {
                                                                background: this.changeColor(this.state.color, -30),
                                                            }
                                                        }}
                                                    >
                                                        Actualizar Datos
                                                    </Button>
                                                </div>
                                            </div>
                                            {/* <hr className="mt-0 mb-4" />
                                            <div className="d-flex justify-content-start">
                                                <a className="button" data-mdb-toggle="modal" data-mdb-target="#exampleModal">Cambiar Foto</a>
                                                <a className="button">Actualizar</a>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{background:"#1f1f1f"}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cambiar Foto de perfil</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img src={this.state.preview}
                                alt="Avatar" className="img-fluid my-5" style={{ width: '200px' }} />
                             <input type="file" name="myImage" onChange= {this.onChange} />
                        </div>

                        <div className="modal-body">
                           
                        </div>
                        
                        <div className="modal-footer">
                           
                            {/* <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.guardarfoto} data-mdb-dismiss="modal">Save changes</button> */}

                            <Button className="button my-3" data-mdb-dismiss="modal"
                                sx={{
                                    mr: 3,
                                    background:"#fff",
                                    color: '#000',
                                    "&:hover": {
                                        background: this.changeColor(this.state.color, 40),
                                    }
                                }}
                            >
                                Cancelar
                            </Button>
                            
                            <Button className="button my-3" onClick={this.guardarfoto} data-mdb-dismiss="modal"
                                sx={{
                                    background:this.state.color,
                                    color: '#fff',
                                    "&:hover": {
                                        background: this.changeColor(this.state.color, -30),
                                    }
                                }}
                            >
                                Actualizar
                            </Button>


                        </div> 
                    </div>
                </div>
            </div>


            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{background:"#1f1f1f"}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cambiar contraseña</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {/* <div className="form-outline mb-4">
                                    <input type="password" id="contraseña_Actual" className="form-control" value={this.state.contrasena} onChange={this.inputChangedHandler3}/>
                                    <label className="form-label" htmlFor="contraseña_Actual">Ingrese la contraseña actual</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="contraseña_nuevo" value={this.state.nueva_contrasena} onChange={this.inputChangedHandlernuevaContrasena} className="form-control" />
                                    <label className="form-label" htmlFor="contraseña_nuevo">Ingrese la nueva contraseña</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="contraseña_comprobar" value={this.state.verificar_contrasena} onChange={this.inputChangedHandlerverificarContrasena} className="form-control" />
                                    <label className="form-label" htmlFor="contraseña_comprobar">Confirmar nueva constraseña</label>
                                </div> */}

                                <CssTextField
                                    margin="normal"
                                    fullWidth
                                    required
                                    id="actual"
                                    name="actual"
                                    label='Ingrese la contraseña actual'
                                    sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                                />
                                <CssTextField
                                    margin="normal"
                                    fullWidth
                                    required
                                    id="new"
                                    name="new"
                                    label='Ingrese la nueva contraseña'
                                    sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                                />
                                <CssTextField
                                    margin="normal"
                                    fullWidth
                                    required
                                    id="new2"
                                    name="new2"
                                    label='Confirmar nueva constraseña'
                                    sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                                />


                            </form>

                        </div>

                        <div className="modal-footer">

                            {/* <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal" onClick={this.close_contrasena}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.actuazlizar_contraseña} data-mdb-dismiss="modal">Actualizar</button> */}

                            
                            <Button className="button my-3" data-mdb-dismiss="modal" onClick={this.close_contrasena}
                                sx={{
                                    mr: 3,
                                    background:"#fff",
                                    color: '#000',
                                    "&:hover": {
                                        background: this.changeColor(this.state.color, 40),
                                    }
                                }}
                            >
                                Cancelar
                            </Button>
                            
                            <Button className="button my-3" onClick={this.actuazlizar_contraseña} data-mdb-dismiss="modal"
                                sx={{
                                    background:this.state.color,
                                    color: '#fff',
                                    "&:hover": {
                                        background: this.changeColor(this.state.color, -30),
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
}