import {Router} from "express";
import {
  addProfileImage,
  getUserInfo,
  login,
  signup,
  updateProfile,
  deleteProfileImage,
  logout,
} from "../controllers/auth.controller.js";
import {verifyToken} from "../middlewares/auth.middleware.js";
import multer from "multer";

const authRoutes = Router();

const upload = multer({dest: "uploads/profiles"});
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"),
  addProfileImage
);
authRoutes.delete("/delete-profile-image", verifyToken, deleteProfileImage);

authRoutes.post("/logout", logout);

export default authRoutes;
