import { Request, Response } from "express";
import { Artist } from "../models/types";
import { ArtistModel } from "../models/artist";

export class ArtistController {
  static async createArtist(req: Request, res: Response) {
    const artist: Artist = req.body;
    const file = req.file as Express.MulterS3.File;
    if (!file) return res.status(401).json({ message: "Faltan datos" });
    // Crear usuario
    const ok = await ArtistModel.createArtist(artist, file);
    // Respuesta
    res.status(ok ? 200 : 400).json({
      message: `Artist ${ok ? "" : "not"} Created`,
    });
  }
  static getArtist(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(401).json({ message: "Falta el id" });
    const id_artist = parseInt(id);
    const response = ArtistModel.getArtist({ id: id_artist });
    res.status(response.ok ? 200 : 400).json({
      response,
    });
  }

  static editArtist(req: Request, res: Response) {
    res.json({ message: "Artist edited" });
  }
  static deleteArtist(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(401).json({ message: "Falta el id" });
    const id_artist = parseInt(id);
    const response = ArtistModel.deleteArtist({ id: id_artist });
    res.status(response.ok ? 200 : 400).json({
      response,
    });
  }
}
