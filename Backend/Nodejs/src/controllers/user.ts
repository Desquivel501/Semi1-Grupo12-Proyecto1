import { Request, Response } from "express";

export class UserController {
  static createUser(req: Request, res: Response) {
    // Validar datos
    // Guardar avatar en S3
    // Crear usuario
    // Respuesta
    res.json({ message: "User Created" });
  }
  static getUser(req: Request, res: Response) {
    const {id} = req.params
    res.json({ user: {id} });
  }

  static editUser(req: Request, res: Response) {
    res.json({ message: "User edited" });
  }
}
