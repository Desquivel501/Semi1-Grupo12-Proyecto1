import { Router } from "express";
import { UserController } from "../controllers/user";
import multer from "multer";
import { checkRole } from "../middlewares/jwt";
import { Roles } from "../models/roles";
import { s3Storage } from "../libs/s3client";
import { PlaylistController } from "../controllers/playlist";

export const userRouter = Router();
const upload = multer({ storage: s3Storage({ userType: "user" }) });

userRouter.get("/:id", checkRole(Roles.user), UserController.getUser);
userRouter.get("/:email/favorites", UserController.getFavorites);
userRouter.get("/:email/history", UserController.getHistory);
userRouter.post("/addFavorite", UserController.addFavorite);
userRouter.post("/newUser", upload.single("avatar"), UserController.createUser);
userRouter.patch("/", upload.single("avatar"),  UserController.editUser);
// playlist
userRouter.get("/:email/playlists", PlaylistController.getUserPlaylists);
userRouter.get("/playlists/:id/songs", PlaylistController.getSongs);
userRouter.post("/newPlaylist", upload.single("cover"), PlaylistController.createPlaylist);
userRouter.post("/playlists/addSong", PlaylistController.addSong);
userRouter.post("/playlists/removeSong", PlaylistController.removeSong);
userRouter.post("/removePlaylist", PlaylistController.removePlaylist);
userRouter.patch("/playlists", upload.single("cover"), PlaylistController.editPlaylist);
