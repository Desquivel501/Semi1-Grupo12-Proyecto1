import { Router } from "express";
import multer from "multer";
import { s3StorageImg } from "../libs/s3client";
import { ArtistController } from "../controllers/artist";

export const artistRouter = Router();
const uploadArtist = multer({ storage: s3StorageImg({ userType: "artist" }) });

artistRouter.get("/:id", ArtistController.getArtist);
artistRouter.post("/newArtist", uploadArtist.single("avatar"),ArtistController.createArtist);
artistRouter.patch("/:id", ArtistController.editArtist);
artistRouter.delete("/:id", ArtistController.deleteArtist);
