import { Router } from "express";
import { UserController } from "../controllers/user";
import multer from "multer";
import { checkRole } from "../middlewares/jwt";
import { Roles } from "../models/roles";
import { s3Storage } from "../libs/s3client";

export const userRouter = Router();
const upload = multer({ storage: s3Storage({ userType: "user" }) });

userRouter.get("/:id", checkRole(Roles.user), UserController.getUser);
userRouter.get("/:email/favorites", UserController.getFavorites);
userRouter.get("/:email/history", UserController.getHistory);
userRouter.post("/addFavorite", UserController.addFavorite);
userRouter.post("/newUser", upload.single("avatar"), UserController.createUser);
userRouter.patch("/", upload.single("avatar"),  UserController.editUser);

