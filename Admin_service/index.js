import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Connectionofdb } from "./Db.js";
import Adminroutes from './routes.js'
import logger from "./Logger.js";
const app = express();
const PORT = process.env.PORT ;

// Test route
app.get("/test", (req, res) => {
  res.send("👋 Hello API Gateway service!");
});
//Routes
app.use(express.json());
app.use("/api/v1",Adminroutes)

Connectionofdb()


// 🚀 Start Server
app.listen(PORT, () => {
  logger.info(`🚀 Admin service is running on port http://localhost:${PORT}`);
});