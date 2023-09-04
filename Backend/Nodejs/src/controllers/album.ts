import { Request, Response } from "express";

export class AlbumController {
  static createAlbum(req: Request, res: Response) {
    res.json({ message: "Album created" });
  }
  static getAlbum(req: Request, res: Response) {
    const {id} = req.params
    res.json({ user: {id} });
  }

  static editAlbum(req: Request, res: Response) {
    res.json({ message: "Album edited" });
  }
  static deleteAlbum(req:Request,res:Response){
    res.json({message:"Album deleted"})
  }
}

