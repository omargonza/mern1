/*

import axios from "./axios";

export const getTasksRequest = async () => axios.get("/tasks");


export const createTaskRequest = async (task) => {
  try {
    // Mostrar en la consola los datos que se enviarán en la solicitud
    console.log('Datos enviados en la solicitud de creación de tarea:', task);

    const response = await axios.post("/tasks", task);

    // Mostrar en la consola la respuesta recibida del servidor
    console.log('Respuesta del servidor al crear tarea:', response.data);

    return response.data; // Puedes ajustar esto según la estructura de tu respuesta
  } catch (error) {
    // Mostrar en la consola un mensaje de error más detallado
    console.error('Error al crear tarea:', error.message);

    // Si la respuesta del servidor está disponible, imprímela también
    if (error.response) {
      console.error('Respuesta del servidor:', error.response.data);
    }

    throw error;
  }
};

export const updateTaskRequest = async (task) =>
  axios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);

*/

import axios from "./axios";

export const getTasksRequest = async () => axios.get("https://electric-2r3p.onrender.com/tasks");

export const createTaskRequest = async (task) => axios.post("https://electric-2r3p.onrender.com/tasks", task);

export const updateTaskRequest = async (id, task) => {
  try {
    const res = await axios.put(`https://electric-2r3p.onrender.com/tasks/${id}`, task);
    console.log('Respuesta de la solicitud de actualización:', res.data);
    return res;
  } catch (error) {
    console.error('Error en la solicitud de actualización:', error);
    throw error; // Re-lanza el error para que sea capturado por la función que llamó a updateTaskRequest
  }
};

export const deleteTaskRequest = async (id) => axios.delete(`https://electric-2r3p.onrender.com/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`https://electric-2r3p.onrender.com/tasks/${id}`);

export const filterTasksRequest = async (search) => axios.get(`https://electric-2r3p.onrender.com/tasks/filter/${search}`);
