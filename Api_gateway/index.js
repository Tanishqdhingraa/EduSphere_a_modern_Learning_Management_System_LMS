import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressProxy from "express-http-proxy";
import logger from "./Logger.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.send("👋 Hello API Gateway service!");
});

// Service URLs
const ADMIN_SERVICE = `http://localhost:${process.env.ADMIN_SERVICE_PORT}`;
// const COURSE_SERVICE = `http://localhost:${process.env.COURSE_SERVICE_PORT}`;
const NOTIFICATION_SERVICE = `http://localhost:${process.env.NOTIFICATION_SERVICE_PORT}`;
// const ORDER_SERVICE = `http://localhost:${process.env.ORDER_SERVICE_PORT}`;
// const USER_SERVICE = `http://localhost:${process.env.USER_SERVICE_PORT}`;

// Routes → Proxies
app.use("/admin", expressProxy(ADMIN_SERVICE));
// app.use("/courses", expressProxy(COURSE_SERVICE));
app.use("/notifications", expressProxy(NOTIFICATION_SERVICE));
// app.use("/orders", expressProxy(ORDER_SERVICE));
// app.use("/users", expressProxy(USER_SERVICE));

// Start Server
app.listen(PORT, () => {
  logger.info(`🚀 API Gateway running at http://localhost:${PORT}`);
});
