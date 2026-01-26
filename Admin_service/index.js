import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Connectionofdb } from "./Db.js";
import Adminroutes from './routes.js'

const app = express();
const PORT =  1111 ;

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
  console.log(`🚀 Admin service running at http://localhost:${PORT}`);
});