import io from 'socket.io-client';

let socket;

export const initSocket = () => {
  // La URL debe coincidir con la URL del servidor Socket.IO
  socket = io('http://localhost:5173');

  // Manejar eventos, configuraciones, etc., según tus necesidades
  // Ejemplo:
  // socket.on('connect', () => {
  //   console.log('Conectado al servidor Socket.IO');
  // });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const useSocket = () => {
  const socket = initSocket(); // Asegúrate de que initSocket esté definido en el mismo archivo o se haya importado desde otro lugar

  const startMonitoring = () => {
    socket.emit('startMonitoring');
  };

  const stopMonitoring = () => {
    socket.emit('stopMonitoring');
  };

  // Otras funciones relacionadas con Socket.IO pueden ir aquí

  return {
    startMonitoring,
    stopMonitoring,
  };
};
