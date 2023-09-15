import { Router } from "express";
import multer from "multer";
import { s3Storage } from "../libs/s3client";
import { PlaylistController } from "../controllers/playlist";

export const playlistRouter = Router();
const uploadPlaylist = multer({storage: s3Storage({userType:"playlist"})})

playlistRouter.get("/:email",PlaylistController.getUserPlaylists);
playlistRouter.get("/:id/data",PlaylistController.getPlaylist);
playlistRouter.get("/:id/songs",PlaylistController.getSongs);
playlistRouter.get("/:id/missing",PlaylistController.getSongsNotInPlaylist);
playlistRouter.post("/newPlaylist",uploadPlaylist.single("cover"),PlaylistController.createPlaylist);
playlistRouter.post("/addSong",PlaylistController.addSong);
playlistRouter.post("/removeSong",PlaylistController.removeSong);
playlistRouter.delete("/:id",PlaylistController.removePlaylist);