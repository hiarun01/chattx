import {compare} from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days

const createToken = (email, userId) => {
  return jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn: maxAge});
};

export const signup = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password is Required");
    }

    const user = await User.create({email, password});
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "none",
    });

    return res.status(201).json({
      id: user.id,
      email: user.email,
      profileSetup: user.profileSetup,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password is Required");
    }

    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).send("User with the given email not found");
    }

    const auth = compare(password, user.password);

    if (!auth) {
      return res.status(400).send("Password is incorrect");
    }

    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      id: user.id,
      email: user.email,
      profileSetup: user.profileSetup,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      color: user.color,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};
