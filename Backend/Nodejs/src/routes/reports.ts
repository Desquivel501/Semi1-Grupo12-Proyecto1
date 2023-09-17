import { Router } from "express";
import { ReportController } from "../controllers/reports";

export const reportRouter = Router();

reportRouter.get("/:email/artists", ReportController.topArtists);
reportRouter.get("/:email/albums", ReportController.topAlbums);
reportRouter.get("/:email/songs", ReportController.topCanciones);
reportRouter.post("/addHistory", ReportController.addToHistory);
