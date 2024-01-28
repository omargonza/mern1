import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taksRoutes from "./routes/tasks.routes.js";
import { FRONTEND_URL } from "./config.js";
import dotenv from 'dotenv';


dotenv.config();



const app = express();



/*
// Configuración de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://mern001.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');

  // Responder a las solicitudes OPTIONS
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});
*/
// Configuración de CORS
try {
  app.use(
    cors({
      credentials: true,
      origin: FRONTEND_URL,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
      exposedHeaders: 'Content-Disposition',
      optionsSuccessStatus: 204,
    })
  );
} catch (error) {
  console.error('Error durante la configuración de CORS:', error);
}


// Resto de tu configuración del servidor

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", taksRoutes);
/*
if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/index.html"));

  app.get("*", (req, res) => {
    console.log(path.resolve("client",  "index.html") );
    res.sendFile(path.resolve("client",  "index.html"));
  });
}
*/
if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/index.html"));

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "index.html"));
    res.sendFile(path.resolve("client",  "index.html"));
  });
}




export default app;