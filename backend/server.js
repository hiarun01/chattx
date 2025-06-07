import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/auth.route.js";
import contactRoute from "./routes/contact.route.js";
import setupSocket from "./socket.js";

dotenv.config({});

const app = express();

const PORT = process.env.PORT || 7000;

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/uploads/profiles", express.static("uploads/profiles"));

// api Routes

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoute);

const server = app.listen(PORT, () => {
  console.log(`Server listen at PORT ${PORT}`);
  connectDB();
});

setupSocket(server);
