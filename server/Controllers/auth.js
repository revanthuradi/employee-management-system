import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../Models/admin.js";
export const signUp = async (req, res) => {
  const { userName, password } = req.body;
  console.log({ userName, password });
  try {
    const duplicateUser = await Admin.findOne({ userName });
    if (duplicateUser) {
      return res.status(400).json({
        message: "User already exists with this username",
      });
    } else {
      const hash = bcrypt.hashSync(password, 12);
      const token = jwt.sign({ userName }, process.env.PRIVATE_KEY);
      const admin = new Admin({ userName, password: hash });

      const newAdmin = await admin.save(); // Save the admin, triggering the middleware

      res.status(201).json({
        message: "User created successfully",
        token,
        admin: {
          userName: newAdmin.userName,
          sno: newAdmin.sno, 
          _id: newAdmin._id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to create an account, try again",
    });
  }
};

export const logIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const admin = await Admin.findOne({ userName });
    if (!admin) {
      res.status(400).json({
        message: "user doesn't exists",
      });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(password, admin.password);
      if (isPasswordCorrect) {
        const token = jwt.sign(
          { userName: admin.userName },
          process.env.PRIVATE_KEY
        );
        res.status(201).json({
          message: "logged in successfully",
          token,
          admin: {
            userName: admin.userName,
            sno: admin.sno,
            _id: admin._id,
          },
        });
      } else {
        res.status(400).json({
          message: "Incorrect password",
        });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
