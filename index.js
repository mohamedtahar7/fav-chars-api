import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import { MONGODB_URI } from "./config.js";
import charRoutes from "./routes/CharRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Makunochi Ippo");
});
app.use("/chars", charRoutes);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("app connected to db");
    app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
