import { useState } from "react";
import { createContext } from "react";
import { registrar, inicioSesion } from "../api/api";

export const sesionContext = createContext();


export function SesionProvider({ children }) {

  const [user, setUser] = useState(() => {
    const id = window.localStorage.getItem("id");
    const token = window.localStorage.getItem("token");
    const type = window.localStorage.getItem("type");
    
    if (id != null && token != null && type != null) {
      return {
        id: id,
        token: token,
        type: type
      };
    }
    return {
      id: "",
      token: "",
      type: 0
    };
  });

  const registro = async (data) => {
      const mensaje_registro = await registrar(data);
      console.log(mensaje_registro)

      if(mensaje_registro.TYPE != "SUCCESS"){
        return mensaje_registro
      } 

      const mensaje_login = await inicioSesion({
        email: data.get("email"),
        password: data.get("password"),
      });
      console.log(mensaje_login)

      return mensaje_registro;
  };    

  const login = async (data) => {
    const mensaje = await inicioSesion(data);

    if(mensaje.TYPE != "SUCCESS"){
      return mensaje
    } 

    const newUser = {
      id: data.email,
      token: mensaje.TOKEN,
      type: mensaje.MESSAGE
    };
    setUser(newUser);
    window.localStorage.setItem("id", newUser.id);
    window.localStorage.setItem("token", newUser.token);
    window.localStorage.setItem("type", newUser.type);


    return mensaje;
  };

  const logout = () => {
    setUser({
      id: "",
      token: "",
      type: 0
    });
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("type");
  };

  return (
      <sesionContext.Provider
        value={{ user, registro, login, logout }}
      >
        {children}
      </sesionContext.Provider>
  );

}

