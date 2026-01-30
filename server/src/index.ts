import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectToMongoDB from "./mongodb";
import router from "./routers/user.router";

configDotenv();

const app = express();
connectToMongoDB();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(8000, () => {
  console.log("server running on http://localhost:8000");
});
