import { useState } from "react";
import { createContext } from "react";
import { registrar, inicioSesion } from "../api/api";

export const sesionContext = createContext();


export function SesionProvider({ children }) {

  const [user, setUser] = useState(() => {
    const sesion = window.localStorage.getItem("user");
    if (sesion != null) {
      return JSON.parse(sesion);
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
    window.localStorage.setItem("user", JSON.stringify(newUser));

    return mensaje;
  };

  const logout = () => {
    setUser({
      id: "",
      token: "",
      type: 0
    });
    window.localStorage.removeItem("user");
  };

  return (
      <sesionContext.Provider
        value={{ user, registro, login, logout }}
      >
        {children}
      </sesionContext.Provider>
  );

}

