import { Request, Response } from "express";
import { ReportModel } from "../models/reports";

export class ReportController {
  static async addToHistory(req: Request, res: Response) {
    const { email, song } = req.body;
    // Validar datos
    if (!email || !song) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    if (email == "" || song == "") {
      return res.status(400).json({ message: "Datos vacíos" });
    }
    ReportModel.addHistory(
      { email, song },
      (response: string, ok: boolean) => {
        // Respuesta
        res.status(ok ? 200 : 400).json(response);
      },
    );
  }

  static async topCanciones(req: Request, res: Response) {
    const { email } = req.params;
    if (!email || email == "") {
      return res.status(400).json({ message: "Faltan datos" });
    }
    ReportModel.topCanciones({ email }, (response: string, ok: boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static async topArtists(req: Request, res: Response) {
    const { email } = req.params;
    if (!email || email == "") {
      return res.status(400).json({ message: "Faltan datos" });
    }
    ReportModel.topArtistas({ email }, (response: string, ok: boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }

  static async topAlbums(req: Request, res: Response) {
    const { email } = req.params;
    if (!email || email == "") {
      return res.status(400).json({ message: "Faltan datos" });
    }
    ReportModel.topAlbumes({ email }, (response: string, ok: boolean) => {
      // Respuesta
      res.status(ok ? 200 : 400).json(response);
    });
  }
}
