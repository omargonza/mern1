import { Server } from "socket.io";
import http from "http";
import ioClient from "socket.io-client"; // Importa la biblioteca del cliente Socket.IO
//import { initSocket } from "./socketService.js";


let isMonitoring = false;
let diagnosticReports = [];
let io; // Variable para almacenar la instancia de Socket.IO en el servidor

 

const startRealTimeMonitoring = async () => {
  if (isMonitoring) {
    throw new Error("La monitorización ya está en marcha.");
  }

  // Lógica para iniciar la monitorización en tiempo real (simulación)
  isMonitoring = true;
  console.log("Monitorización en tiempo real iniciada.");

  // Configuración del servidor HTTP
  const httpServer = http.createServer();
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173", // Cambia esto según la configuración de tu frontend
      methods: ["GET", "POST"],
    },
  });

  // Manejar conexiones de sockets
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    // Puedes realizar operaciones adicionales aquí según las conexiones de sockets, como enviar datos en tiempo real.
  });

  // Escuchar en el puerto 3001 (cambia esto según tus necesidades)
  httpServer.listen(4001);

  // Puedes realizar operaciones adicionales aquí según las configuraciones del servidor en tiempo real.
};

const stopRealTimeMonitoring = async () => {
  if (!isMonitoring) {
    throw new Error("La monitorización no está en marcha.");
  }

  // Lógica para detener la monitorización en tiempo real (simulación)
  isMonitoring = false;
  console.log("Monitorización en tiempo real detenida.");

  // Puedes realizar operaciones adicionales aquí según la detención de la monitorización en tiempo real.
};

const getDiagnosticReports = async () => {
  // Lógica para obtener informes de diagnóstico (simulación)
  if (!isMonitoring) {
    throw new Error("La monitorización no está en marcha. No hay informes disponibles.");
  }

  // Simulación de informes de diagnóstico
  diagnosticReports.push({
    timestamp: new Date(),
    issues: ["Cortocircuito en el panel de control", "Pérdida de aislamiento en cable X"],
  });

  console.log("Informes de diagnóstico obtenidos:", diagnosticReports);

  // Emitir informes a los clientes conectados a través de sockets
  io.emit("diagnosticReports", diagnosticReports);

  return diagnosticReports;
};

// Lógica del cliente Socket.IO
const initSocket = () => {
  const socket = ioClient("http://localhost:5173"); // Cambia la URL según la configuración de tu servidor Socket.IO

  socket.on("connect", () => {
    console.log("Conectado al servidor Socket.IO en el puerto 5173");
  });

  socket.on("disconnect", () => {
    console.log("Desconectado del servidor Socket.IO");
  });

  

  return socket;
};

export { startRealTimeMonitoring, stopRealTimeMonitoring, getDiagnosticReports, initSocket };
