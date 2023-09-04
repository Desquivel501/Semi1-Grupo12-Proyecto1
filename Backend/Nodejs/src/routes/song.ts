import { Router } from "express";

export const songRouter = Router();

songRouter.get("/:id");
songRouter.post("/newSong");
songRouter.patch("/:id");
songRouter.delete("/:id");
