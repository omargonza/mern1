import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("https://electric-2r3p.onrender.com/tasks", auth, getTasks);

router.post("https://electric-2r3p.onrender.com/tasks", auth, validateSchema(createTaskSchema), createTask);

router.get("https://electric-2r3p.onrender.com/tasks/:id", auth, getTask);

router.put("https://electric-2r3p.onrender.com/tasks/:id", auth, updateTask);

router.delete("https://electric-2r3p.onrender.com/tasks/:id", auth, deleteTask);

export default router;