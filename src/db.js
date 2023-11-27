
import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error);
    process.exit(1);
  }
};

/*
import mongoose from 'mongoose';
import { MONGODB_URI } from  "./config.js";  // Asegúrate de ajustar la ruta

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
*/