import { Router } from "express";
import { UserController } from "../controllers/user";
import multer from "multer";
import { s3StorageImg } from "../libs/s3client";

export const userRouter = Router();
const upload = multer({storage:s3StorageImg})

userRouter.get("/:id",UserController.getUser);
userRouter.post("/newUser", upload.single("avatar"),UserController.createUser);
userRouter.patch("/:id", UserController.editUser);
//userRouter.delete("/:id");
