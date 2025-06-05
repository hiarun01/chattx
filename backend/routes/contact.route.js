import {Router} from "express";
import {verifyToken} from "../middlewares/auth.middleware.js";
import {searchContact} from "../controllers/contact.controller.js";

const contactRoute = Router();

contactRoute.post("/search", verifyToken, searchContact);

export default contactRoute;
