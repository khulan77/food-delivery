import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectToMongoDB from "./mongodb";

configDotenv();

const app = express();
connectToMongoDB();
app.use(cors());
app.use(express.json());

app.listen(8000, () => {
  console.log("server running on http://localhost:8000");
});
