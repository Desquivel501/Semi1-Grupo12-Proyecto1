import { Request, Response } from "express";
import { Credentials } from "../models/types";

export class AuthController {
  static login(req: Request, res: Response) {
    const { email, password } = req.body as Credentials;
    if (!email || !password) {
      return res.status(401).json({ message: "Faltan datos" });
    }
    res.json({ message: "Bienvenido" });
  }
  static logout(req: Request, res: Response) {
    const { id } = req.params;
    res.json({ message: "Adiós" });
  }
}
