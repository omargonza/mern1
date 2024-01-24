import axios from "./axios";

export const registerRequest = async (user) =>
  axios.post(`https://electric-2r3p.onrender.com/auth/register`, user);

export const loginRequest = async (user) => axios.post(`https://electric-2r3p.onrender.com/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`https://electric-2r3p.onrender.com/auth/verify`);
