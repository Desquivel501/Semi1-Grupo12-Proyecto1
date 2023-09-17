import { Router } from "express";
import multer from "multer";
import { s3Storage } from "../libs/s3client";
import { AlbumController } from "../controllers/album";

export const albumRouter = Router();
const uploadAlbum = multer({storage: s3Storage({userType:"album"})})

albumRouter.get("/",AlbumController.getAlbums);
albumRouter.get("/:id",AlbumController.getAlbum);
albumRouter.get("/:id/songs",AlbumController.getSongs);
albumRouter.post("/newAlbum",uploadAlbum.single("cover"),AlbumController.createAlbum);
albumRouter.post("/addSong",AlbumController.addSong);
albumRouter.post("/removeSong",AlbumController.removeSong);
albumRouter.patch("/",uploadAlbum.single("cover"),AlbumController.editAlbum);
albumRouter.delete("/:id",AlbumController.deleteAlbum);
