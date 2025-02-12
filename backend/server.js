import express from "express";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
 
const app = express();
const PORT = ENV_VARS.PORT

app.use(express.json()); // parsear req.body a un JSON

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/tv", tvRoutes);


app.listen(PORT, () => {
console.log("server started at http://localhost:" + PORT);
connectDB();
});