import { Router } from "express";
import { UserController } from "../controllers/user";
import multer from "multer";
import { s3StorageImg } from "../libs/s3client";
import { checkRole } from "../middlewares/jwt";
import { Roles } from "../models/roles";

export const userRouter = Router();
const upload = multer({ storage: s3StorageImg({ userType: "user" }) });

userRouter.get("/:id", checkRole(Roles.user), UserController.getUser);
userRouter.post("/newUser", upload.single("avatar"), UserController.createUser);
userRouter.patch("/:id", checkRole(Roles.user), UserController.editUser);
//userRouter.delete("/:id");
