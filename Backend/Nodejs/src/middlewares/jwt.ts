import { NextFunction, Request, Response } from "express";
import { checkToken } from "../libs/jwt";
import { Roles } from "../models/roles";

export function checkRole(role: Roles) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ MESSAGE: "No tiene autorización" });
    }
    next();
    // const decoded = checkToken(token.split(" ")[1]);
    // if (!decoded) {
    //   return res.status(401).json({ MESSAGE: "Vuelva a iniciar sesión" });
    // }
  };
}
