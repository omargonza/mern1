import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Buscando usuario en la base de datos...");
    const userFound = await User.findOne({ email });

    if (userFound) {
      console.log("Usuario encontrado en la base de datos.");
      return res.status(400).json({
        message: ["The email is already in use"],
      });
    }

    console.log("Hashing password...");
    const passwordHash = await bcrypt.hash(password, 10);

    console.log("Creando nuevo usuario...");
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    console.log("Guardando usuario en la base de datos...");
    const userSaved = await newUser.save();

    console.log("Creando token de acceso...");
    const token = await createAccessToken({
      id: userSaved._id,
    });

    console.log("Enviando respuesta...");
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    console.error("Se produjo un error:", error);
    // Asegúrate de que registerErrors es un array antes de usar .map()
    if (Array.isArray(error.message)) {
      error.message.map(err => {
        console.error(err);
      });
    } else {
      console.error('registerErrors no es un array:', error.message);
    }
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
