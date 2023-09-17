import { Router } from "express";
import multer from "multer";
import { SongController } from "../controllers/song";
import { s3Storage } from "../libs/s3client";

export const songRouter = Router();
const uploadMP3 = multer({ storage: s3Storage({ userType: "song" }) });

songRouter.get("/", SongController.getSongs);
songRouter.get("/:id", SongController.getSong);
songRouter.post(
  "/newSong",
  uploadMP3.fields([
    { name: "cover", maxCount: 1 },
    { name: "source", maxCount: 1 },
  ]),
  SongController.createSong,
);
songRouter.patch(
  "/",
  uploadMP3.fields([
    { name: "cover", maxCount: 1 },
    { name: "source", maxCount: 1 },
  ]),
  SongController.editSong,
);
songRouter.delete("/:id", SongController.deleteSong);
