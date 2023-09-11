import { Request, Response } from "express";
import { Album } from "../models/types";
import { AlbumModel } from "../models/album";

export class AlbumController {
  static createAlbum(req: Request, res: Response) {
    const album = req.body as Album;
    const file = req.file as Express.MulterS3.File;
    if (!album || !file) {
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

  static editAlbum(req: Request, res: Response) {
    res.json({ message: "Album edited" });
  }
  static deleteAlbum(req: Request, res: Response) {
    res.json({ message: "Album deleted" });
  }
}
