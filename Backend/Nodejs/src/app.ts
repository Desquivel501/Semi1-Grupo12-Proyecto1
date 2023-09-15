import express from "express";
import cors from "cors"
import "dotenv/config"
import { router as authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { songRouter } from "./routes/song";
import { artistRouter } from "./routes/artist";
import { albumRouter } from "./routes/album";
import { playlistRouter } from "./routes/playlist";

const app = express();
app.use(cors())
app.use(express.json())

app.use("/api",authRouter)
app.use("/api/users",userRouter)
app.use("/api/songs",songRouter)
app.use("/api/artists",artistRouter)
app.use("/api/albums",albumRouter)
app.use("/api/playlists", playlistRouter)

app.get("/", (req, res) => {
  res.send("<h1>Hola mundo</h1>");
});

export default app
