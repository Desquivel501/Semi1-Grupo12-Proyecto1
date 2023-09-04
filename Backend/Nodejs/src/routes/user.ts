import { Router } from "express";
import { UserController } from "../controllers/user";
import multer from "multer";

export const userRouter = Router();
const upload = multer()

userRouter.get("/:id",UserController.getUser);
userRouter.post("/newUser", upload.single("avatar"),UserController.createUser);
userRouter.patch("/:id", UserController.editUser);
//userRouter.delete("/:id");
