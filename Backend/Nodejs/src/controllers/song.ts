import { Request, Response } from "express";
import { Song, SongFiles } from "../models/types";
import { SongModel } from "../models/song";

export class SongController {
  static createSong(req: Request, res: Response) {
    const song = req.body as Song;
    const files = req.files as SongFiles;
    if (!song || !("cover" in files) || !("source" in files)) {
      return res.status(400).json({ MESSAGE: "Faltan parámetros" });
    }
    SongModel.createSong(song, files, (response: any, ok: Boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static getSong(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(401).json({ message: "Falta el id" });
    const id_song = parseInt(id);
    SongModel.getSong({ id: id_song }, (response: any, ok: Boolean) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static getSongs(req: Request, res: Response) {
    SongModel.getSongs((response: any, ok: Boolean) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static editSong(req: Request, res: Response) {
    res.json({ message: "Song edited" });
  }

  static deleteSong(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(401).json({ MESSAGE: "Falta el id" });
    const id_album = parseInt(id);
    SongModel.deleteSong({ id: id_album }, (response, ok) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }
}
