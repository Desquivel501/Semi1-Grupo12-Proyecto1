import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { checkKeys } from "../utils/checkKeys";
import { FavoriteSong, UpdateUser } from "../models/types";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const user = req.body;
    const file = req.file as Express.MulterS3.File;
    // Validar datos
    if (!checkKeys(user, ["avatar"])) {
      return res.status(400).json({ message: "Falta la fotografía" });
    }
    // Crear usuario
    UserModel.createUser(user, file, (response: string, ok: boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }
  static async getUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Falta la fotografía" });
    UserModel.getUser({ email: id }, (response: string, ok: boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static editUser(req: Request, res: Response) {
    const user = req.body as UpdateUser;
    const file = req.file as Express.MulterS3.File;
    // Validar datos
    if (!checkKeys(user, ["avatar"])) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    // Crear usuario
    UserModel.editUser(user, file, (response: string, ok: boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static addFavorite(req: Request, res: Response) {
    const song = req.body as FavoriteSong;
    // Validar datos
    if (!checkKeys(song)) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    UserModel.addToFavorite(song, (response: any, ok: Boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static getFavorites(req: Request, res: Response) {
    const { email } = req.params;
    // Validar datos
    UserModel.getFavorites({ email }, (response: any, ok: Boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static getHistory(req: Request, res: Response) {
    const { email } = req.params;
    // Validar datos
    UserModel.getHistory({ email }, (response: any, ok: Boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }
}
