import { Request, Response } from "express";
import { UserModel } from "../models/user";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const user = req.body;
    const file = req.file as Express.MulterS3.File;
    // Validar datos
    if (!file) return res.status(400).json({ message: "Falta la fotografía" });
    // Crear usuario
    UserModel.createUser(user, file, (response: string, ok:boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }
  static async getUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Falta la fotografía" });
    UserModel.getUser({email:id}, (response: string, ok:boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static editUser(req: Request, res: Response) {
    res.json({ message: "User edited" });
  }
}
