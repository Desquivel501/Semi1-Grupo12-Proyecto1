import { useState } from "react";
import { createContext } from "react";
import { registrar, inicioSesion } from "../api/api";

export const sesionContext = createContext();


export function SesionProvider({ children }) {

    const registro = async (data) => {
        const mensaje = await registrar(data);
        return mensaje[0] ?? {};
    };    

    const login = async (data) => {
      const mensaje = await inicioSesion(data);

      // if (!isNaN(newSesion[0].MENSAJE)) {
      //   // Es número, por lo tanto es rol
      //   // Actualizamos el usuario
      //   const newUser = {
      //     id: data.get("email"),
      //     token: roles[newSesion[0].MENSAJE],
      //   };
      //   setUser(newUser);
      //   window.sessionStorage.setItem("user", JSON.stringify(newUser));
      //   if (newUser.rol == "Administrador") return "/Administrador/Solicitudes";
      //   if (newUser.rol == "Repartidor") return "/Repartidor/MisPedidos";
      //   if (newUser.rol == "Empresa") return "/Empresa/CatalogoEmpresa";
      //   if (newUser.rol == "Cliente") return "/Empresas";
      // }
      // Si es un mensaje string entonces es error
      return mensaje;
    };



    return (
        <sesionContext.Provider
          value={{ registro, login }}
        >
          {children}
        </sesionContext.Provider>
    );

}

