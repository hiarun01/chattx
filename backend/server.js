import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/auth.route.js";
import contactRoute from "./routes/contact.route.js";
import setupSocket from "./socket.js";
import messagesRoute from "./routes/messages.route.js";

dotenv.config({});

const app = express();

const PORT = process.env.PORT || 7000;

const mode = process.env.MODE;

if (mode === "dev") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
} else if (mode === "prod") {
  app.use(
    cors({
      origin: "https://chattx.vercel.app",
      credentials: true,
    })
  );
}

app.use(cookieParser());
app.use(express.json());
app.use("/uploads/profiles", express.static("uploads/profiles"));

// api Routes

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoute);
app.use("/api/messages", messagesRoute);

const server = app.listen(PORT, () => {
  console.log(`Server listen at PORT ${PORT}`);
  connectDB();
});

setupSocket(server);
