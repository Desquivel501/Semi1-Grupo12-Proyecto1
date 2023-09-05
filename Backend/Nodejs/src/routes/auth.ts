import { Router } from "express";
import { AuthController } from "../controllers/auth";

export const router = Router();

router.post("/login",AuthController.login);

router.get("/logout",AuthController.logout);
