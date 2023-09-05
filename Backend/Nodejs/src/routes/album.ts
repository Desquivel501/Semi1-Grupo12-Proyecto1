import { Router } from "express";

export const albumRouter = Router();

albumRouter.get("/:id");
albumRouter.post("/newAlbum");
albumRouter.patch("/:id");
albumRouter.delete("/:id");
