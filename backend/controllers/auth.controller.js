import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 100;

const createToken = (email, userId) => {
  return jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn: maxAge});
};

export const signup = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password is Required");
    }

    const user = await User.create({email, password});
    res.cookie("jwt", createToken(email, userId), {
      maxAge,
      secure: true,
      sameSite: "none",
    });

    return res.status(201).json({
      id: user.id,
      email: user.enail,
      profileSetup: user.profileSetup,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};
