import { Request, Response } from "express";
import { Playlist } from "../models/types";
import { PlaylistModel } from "../models/playlist";

export class PlaylistController {
  static createPlaylist(req: Request, res: Response) {
    const playlist = req.body as Playlist;
    const file = req.file as Express.MulterS3.File;
    if (!playlist || !file) {
      return res.status(400).json({ MESSAGE: "Faltan parámetros" });
    }
    PlaylistModel.createPlaylist(
      playlist,
      file,
      (response: any, ok: Boolean) => {
        // Respuesta
        res.status(ok ? 200 : 400).json(response);
      },
    );
  }

  static getUserPlaylists(req: Request, res: Response) {
    const { email } = req.params;
    if (!email) return res.status(401).json({ message: "Falta el correo" });
    PlaylistModel.getUserPlaylist(
      { email },
      (response: any, ok: Boolean) => {
        res.status(ok ? 200 : 400).json(response);
      },
    );
  }


  static getPlaylist(req: Request, res: Response) {
    const { id } = req.params
    if (!id) return res.status(401).json({ message: "Falta el id de la playlist" });
    
    PlaylistModel.getPlaylist({ id }, (response: any, ok: Boolean) => {
        res.status(ok ? 200 : 400).json(response);
      },);
  }


  static getSongs(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({ message: "Falta el id de la playlist" });
    }
    PlaylistModel.getSongs({ id }, (response: any, ok: Boolean) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }
  
  static getSongsNotInPlaylist(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({ message: "Falta el id de la playlist" });
    }
    PlaylistModel.getSongsNotInPlaylist({ id }, (response: any, ok: Boolean) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static addSong(req: Request, res: Response) {
    const { playlist, song, email } = req.body;
    if (!playlist || !song || !email) {
      return res.status(401).json({ MESSAGE: "Faltan datos" });
    }
    PlaylistModel.addSong(playlist, song, email, (response, ok) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static removeSong(req: Request, res: Response) {
    const { playlist, song, email } = req.body;
    if (!playlist || !song || !email) {
      return res.status(401).json({ MESSAGE: "Faltan datos" });
    }
    PlaylistModel.removeSong(playlist, song, email, (response, ok) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static removePlaylist(req: Request, res: Response) {
    const { playlist, email } = req.body;
    if (!playlist || !email) {
      return res.status(401).json({ MESSAGE: "Faltan datos" });
    }
    const id = parseInt(playlist);
    PlaylistModel.deletePlaylist({ id, email }, (response, ok) => {
      res.status(ok ? 200 : 400).json(response);
    });
  }
}
