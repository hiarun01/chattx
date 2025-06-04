import {compare} from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {renameSync, unlinkSync} from "fs";

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
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData)
      return res.status(404).send("User with the given id not found!");
    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {userId} = req;

    const {firstName, lastName} = req.body;

    if (!firstName || !lastName) {
      return res.status(400).send("firstName and lastName is required");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        profileSetup: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

export const addProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("file is required");
    }
    const date = Date.now();
    let fileName = "uploads/profiles/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {image: fileName},
      {new: true, runValidators: true}
    );

    return res.status(200).json({
      image: updatedUser.image,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteProfileImage = async (req, res) => {
  try {
    const {userId} = req;
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).send("user not found");
    }

    if (user.image) {
      unlinkSync(user.image);
    }

    user.image = null;
    await user.save();

    return res.status(200).send("Profile Image delete successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 1, secure: true, sameSite: "None"});
    return res.status(200).send("Logout successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};
