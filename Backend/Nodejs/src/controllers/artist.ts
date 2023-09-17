import { Request, Response } from "express";
import { Artist, UpdateArtist } from "../models/types";
import { ArtistModel } from "../models/artist";
import { checkKeys } from "../utils/checkKeys";

export class ArtistController {
  static async createArtist(req: Request, res: Response) {
    const artist: Artist = req.body;
    const file = req.file as Express.MulterS3.File;
    if (checkKeys(artist, ["avatar", "birthDate"]) || !file) {
      return res.status(401).json({ message: "Faltan datos" });
    }
    // Crear usuario
    ArtistModel.createArtist(artist, file, (response: any, ok: Boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static getArtist(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(401).json({ message: "Falta el id" });
    const id_artist = parseInt(id);
    ArtistModel.getArtist({ id: id_artist }, (response: any, ok: Boolean) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static getArtists(req: Request, res: Response) {
    ArtistModel.getArtists((response: any, ok: Boolean) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static getSongs(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(401).json({ message: "Falta el id" });
    const id_artist = parseInt(id);
    ArtistModel.getSongs({ id: id_artist }, (response: any, ok: Boolean) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static editArtist(req: Request, res: Response) {
    const artist = req.body as UpdateArtist;
    const file = req.file as Express.MulterS3.File;
    // Validar datos
    if (!checkKeys(artist, ["avatar"])) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    // Crear usuario
    ArtistModel.editArtist(artist, file, (response: string, ok: boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static deleteArtist(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(401).json({ message: "Falta el id" });
    const id_artist = parseInt(id);
    ArtistModel.deleteArtist(
      { id: id_artist },
      (response: any, ok: Boolean) => {
        res.status(ok ? 200 : 400).json(response);
      },
    );
  }
}
