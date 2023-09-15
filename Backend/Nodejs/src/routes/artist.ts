import { Router } from "express";
import multer from "multer";
import { ArtistController } from "../controllers/artist";
import { s3Storage } from "../libs/s3client";

export const artistRouter = Router();
const uploadArtist = multer({ storage: s3Storage({ userType: "artist" }) });

artistRouter.get("/", ArtistController.getArtists);
artistRouter.get("/:id", ArtistController.getArtist);
artistRouter.get("/:id/songs", ArtistController.getSongs);
artistRouter.get("/:id/songs/notInAlbum", ArtistController.getSongsNotInAlbum);
artistRouter.post("/newArtist", uploadArtist.single("avatar"),ArtistController.createArtist);
artistRouter.patch("/:id", ArtistController.editArtist);
artistRouter.delete("/:id", ArtistController.deleteArtist);
