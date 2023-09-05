import express from "express";
import "dotenv/config"
import { router as authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { songRouter } from "./routes/song";
import { artistRouter } from "./routes/artist";
import { albumRouter } from "./routes/album";

const app = express();
app.use(express.json())

app.use("/api",authRouter)
app.use("/api/user",userRouter)
app.use("/api/song",songRouter)
app.use("/api/artist",artistRouter)
app.use("/api/album",albumRouter)
app.use("/api/song",songRouter)

app.get("/", (req, res) => {
  res.send("<h1>Hola mundo</h1>");
});

export default app
