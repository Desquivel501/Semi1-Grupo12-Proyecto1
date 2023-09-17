import { Request, Response } from "express";
import { Album, UpdateAlbum } from "../models/types";
import { AlbumModel } from "../models/album";
import { checkKeys } from "../utils/checkKeys";

export class AlbumController {
  static createAlbum(req: Request, res: Response) {
    const album = req.body as Album;
    const file = req.file as Express.MulterS3.File;
    if (!checkKeys(album, ["cover", "email", "description"]) || !file) {
      return res.status(400).json({ MESSAGE: "Faltan datos" });
    }
    AlbumModel.createAlbum(album, file, (response, ok) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static getAlbum(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(401).json({ MESSAGE: "Falta el id" });
    const id_album = parseInt(id);
    AlbumModel.getAlbum({ id: id_album }, (response, ok) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static getAlbums(req: Request, res: Response) {
    AlbumModel.getAlbums((response, ok) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static getSongs(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(401).json({ MESSAGE: "Falta el id" });
    const id_album = parseInt(id);
    AlbumModel.getSongs({ id: id_album }, (response, ok) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static addSong(req: Request, res: Response) {
    const { id_album, id_song } = req.body;
    if (!id_album || !id_song) {
      return res.status(400).json({ MESSAGE: "Faltan datos" });
    }
    AlbumModel.addSong(
      parseInt(id_album),
      parseInt(id_song),
      (response, ok) => {
        res.status(ok ? 200 : 400).json(response);
      },
    );
  }

  static removeSong(req: Request, res: Response) {
    const { id_album, id_song } = req.body;
    if (!id_album || !id_song) {
      return res.status(400).json({ MESSAGE: "Faltan datos" });
    }
    AlbumModel.removeSong(
      parseInt(id_album),
      parseInt(id_song),
      (response, ok) => {
        res.status(ok ? 200 : 400).json(response);
      },
    );
  }

  static editAlbum(req: Request, res: Response) {
    const album = req.body as UpdateAlbum;
    const file = req.file as Express.MulterS3.File;
    // Validar datos
    if (!checkKeys(album, ["cover", "description"])) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    // Crear usuario
    AlbumModel.editAlbum(album, file, (response: string, ok: boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static deleteAlbum(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(401).json({ MESSAGE: "Falta el id" });
    const id_album = parseInt(id);
    AlbumModel.deleteAlbum({ id: id_album }, (response, ok) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }
}
