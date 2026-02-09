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

const PORT = process.env.PORT || 8000;

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
