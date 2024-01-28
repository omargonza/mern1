import axios from "axios";
import { API_URL } from "../config.js";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Log de las solicitudes
instance.interceptors.request.use((config) => {
  console.log("Solicitud enviada:", config);
  return config;
});

// Log de las respuestas
instance.interceptors.response.use(
  (response) => {
    console.log("Respuesta recibida:", response);
    return response;
  },
  (error) => {
    console.error("Error de respuesta:", error);

    // Captura de errores específicos
    if (error.response) {
      // El servidor respondió con un estado de error (por ejemplo, 4xx, 5xx)
      console.error("Respuesta del servidor con error:", error.response.data);
    } else if (error.request) {
      // La solicitud fue realizada, pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      // Ocurrió un error durante la configuración de la solicitud
      console.error("Error durante la configuración de la solicitud:", error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
