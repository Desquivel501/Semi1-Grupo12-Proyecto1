import { Router } from "express";

export const router = Router();

router.get("/login", (req,res) => {
  res.json({message:"welcome"})
});

router.get("/logout", (req,res) => {
  res.json({message:"bye"})
});
