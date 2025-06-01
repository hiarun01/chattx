import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/auth.route.js";

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

// api Routes

app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
  console.log(`Server listen at PORT ${PORT}`);
  connectDB();
});
