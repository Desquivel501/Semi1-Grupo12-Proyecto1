import { useContext } from "react";
import { sesionContext } from "../context/SessionContext";

export function useSesion() {
    const sesion = useContext(sesionContext);
    return sesion
  }