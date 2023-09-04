import { Router } from "express";

export const artistRouter = Router();

artistRouter.get("/:id");
artistRouter.post("/newArtist");
artistRouter.patch("/:id");
artistRouter.delete("/:id");
