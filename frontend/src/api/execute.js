// import axios from "axios";
// const API = import.meta.env.VITE_API_URL;

// export const runQuery = (sql) =>
//   axios.post(`${API}/execute`, { sql });

import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const runQuery = (assignmentId, userQuery) =>
  axios.post(`${API}/runquery`, { assignmentId, userQuery });
