import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getHint = (assignmentId, userQuery) =>
  axios.post(`${API}/hint`, { assignmentId, userQuery }, {headers: {"Content-Type": "application/json"}});
