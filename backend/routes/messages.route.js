import {Router} from "express";
import {verifyToken} from "../middlewares/auth.middleware.js";
import {getMessages} from "../controllers/message.controller.js";

const messagesRoute = Router();

messagesRoute.post("/get-messages", verifyToken, getMessages);

export default messagesRoute;
