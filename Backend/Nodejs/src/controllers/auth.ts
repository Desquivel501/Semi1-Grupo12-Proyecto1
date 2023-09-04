import { Request, Response } from "express";

export class AuthController {
  static login(req: Request, res: Response) {
    res.json({ message: "Bienvenido" });
  }
  static logout(req: Request, res: Response) {
    const {id} = req.params
    res.json({ message:"Adiós" });
  }
}
