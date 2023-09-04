import { Request, Response } from "express";

export class ArtistController {
  static createArtist(req: Request, res: Response) {
    res.json({ message: "Artist created" });
  }
  static getArtist(req: Request, res: Response) {
    const {id} = req.params
    res.json({ user: {id} });
  }

  static editArtist(req: Request, res: Response) {
    res.json({ message: "Artist edited" });
  }
  static deleteArtist(req:Request,res:Response){
    res.json({message:"Artist deleted"})
  }
}

