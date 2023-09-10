import React, { Component } from 'react';
import './Perfil.css';

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
        foto: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp", // aca se guarda la foto que se recibe desde la base de datos 
        contrasena: '',
        nueva_contrasena: '',
        verificar_contrasena: '',
        preview: ''
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
    this.setState({preview : URL.createObjectURL(e.target.files[0]        )    
      
 })  
}

    guardarfoto = (e) =>{
        this.setState({foto : this.state.preview})
        this.setState({preview : ''})
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

    
    render() {
        return (

            <><h1>Perfil</h1><section className="vh-170">
                <div className="container py-3 h-50">
                    <div className="row d-flex justify-content-center align-items-center h-50">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                                <div className="row g-0">
                                    <div className="col-md-3 gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <img src={this.state.foto}
                                            alt="Avatar" className="img-fluid my-5" style={{ width: '80px' }} />
                                        <h5>{this.state.nombretemp+' '+this.state.apellidotemp}</h5>
                                        <p>{this.state.tipo_usuario}</p>

                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body p-4">
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Nombre</h6>
                                                    <input type="text" className="form-control" value={this.state.nombre} onChange={this.inputChangedHandler1} name="Nombre" placeholder="Nombre" />
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Apellido</h6>
                                                    <input type="text" className="form-control" value={this.state.apellido} onChange={this.inputChangedHandler2} name="Apellido" placeholder="Apellido" />
                                                </div>
                                            </div>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Correo</h6>
                                                    <p className="text-muted">{this.state.correo}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Actualizar Contraseña</h6>
                                                    <a className="button" data-mdb-toggle="modal" data-mdb-target="#exampleModal2">Actualizar</a>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <a className="button" data-mdb-toggle="modal" data-mdb-target="#exampleModal">Cambiar Foto</a>
                                                <a className="button">Actualizar</a>
                                            </div>
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
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Cambiar Foto de perfil</h5>
                                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <img src={this.state.preview}
                                    alt="Avatar" className="img-fluid my-5" style={{ width: '80px' }} />
                                
                            </div>
                            
                            <div className="modal-footer">
                                <input type="file" name="myImage" onChange= {this.onChange} />
                                <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.guardarfoto} data-mdb-dismiss="modal">Save changes</button>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Cambiar contraseña</h5>
                                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-outline mb-4">
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
                                    </div>
                                </form>

                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal" onClick={this.close_contrasena}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.actuazlizar_contraseña} data-mdb-dismiss="modal">Actualizar</button>
                            </div>
                        </div>
                    </div>
                </div></>



        )
    }
}