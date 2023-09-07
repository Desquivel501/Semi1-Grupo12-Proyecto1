import { Router } from "express";
import multer from "multer";
import { s3Storage } from "../libs/s3client";
import { AlbumController } from "../controllers/album";

export const albumRouter = Router();
const uploadAlbum = multer({storage: s3Storage({userType:"album"})})

albumRouter.get("/:id",AlbumController.getAlbum);
albumRouter.get("/:id/songs",AlbumController.getSongs);
albumRouter.post("/newAlbum",uploadAlbum.single("cover"),AlbumController.createAlbum);
albumRouter.patch("/:id");
albumRouter.delete("/:id");
