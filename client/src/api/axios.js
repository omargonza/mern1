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
instance.interceptors.response.use((response) => {
  console.log("Respuesta recibida:", response);
  return response;
}, (error) => {
  console.error("Error de respuesta:", error);
  return Promise.reject(error);
});

export default instance;
