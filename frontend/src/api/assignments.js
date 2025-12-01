import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getAssignments = () => axios.get(`${API}/assignments`);
export const getAssignmentById = (id) => axios.get(`${API}/assignments/${id}`);
