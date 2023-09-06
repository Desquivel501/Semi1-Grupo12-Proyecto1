import { Request, Response } from "express";
import { Credentials } from "../models/types";
import { AuthModel } from "../models/auth";

export class AuthController {
  static login(req: Request, res: Response) {
    const { email, password } = req.body as Credentials;
    if (!email || !password) {
      return res.status(401).json({ message: "Faltan datos" });
    }
    // Login
    AuthModel.login({ email, password }, (response: string, ok: boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }
  static logout(req: Request, res: Response) {
    const { id } = req.params;
    res.json({ message: "Adiós" });
  }
}
