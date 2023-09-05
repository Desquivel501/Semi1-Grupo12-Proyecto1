import { Request, Response } from "express";
import { UserModel } from "../models/user";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const user = req.body;
    const file = req.file as Express.MulterS3.File
    // Validar datos
    if (!file) return res.status(400).json({ message: "Falta la fotografía" });
    // Crear usuario
    const ok = await UserModel.createUser(user, file);
    // Respuesta
    res.status(ok ? 200 : 400).json({
      message: `User ${ok ? "" : "not"} Created`,
    });
  }
  static async getUser(req: Request, res: Response) {
    const { email } = req.params;
    const response = await UserModel.getUser({ email });
    res.status(response.ok ? 200 : 400).json({
      response,
    });
  }

  static editUser(req: Request, res: Response) {
    res.json({ message: "User edited" });
  }
}
