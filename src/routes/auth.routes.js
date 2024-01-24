import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";


const router = Router();

router.post("https://electric-2r3p.onrender.com/register", validateSchema(registerSchema), register);
router.post("https://electric-2r3p.onrender.com/login", validateSchema(loginSchema), login);
router.get("https://electric-2r3p.onrender.com/verify", verifyToken);
router.post("https://electric-2r3p.onrender.com/logout", verifyToken, logout);

export default router;
