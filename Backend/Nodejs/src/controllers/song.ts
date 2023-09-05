import { Request, Response } from "express";

export class SongController {
  static createSong(req: Request, res: Response) {
    res.json({ message: "Song created" });
  }
  static getSong(req: Request, res: Response) {
    const {id} = req.params
    res.json({ user: {id} });
  }

  static editSong(req: Request, res: Response) {
    res.json({ message: "Song edited" });
  }
  static deleteSong(req:Request,res:Response){
    res.json({message:"Song deleted"})
  }
}

