import {Router} from "express";
import {verifyToken} from "../middlewares/auth.middleware.js";
import {
  getDMContactsList,
  searchContact,
} from "../controllers/contact.controller.js";

const contactRoute = Router();

contactRoute.post("/search", verifyToken, searchContact);
contactRoute.get("/get-dm-contacts", verifyToken, getDMContactsList);

export default contactRoute;
 