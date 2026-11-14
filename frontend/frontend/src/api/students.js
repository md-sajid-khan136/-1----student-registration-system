import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

// Expected REST contract on the Express backend:
//   GET    /api/students        -> [student, ...]
//   GET    /api/students/:id    -> student
//   POST   /api/students        -> student
//   PUT    /api/students/:id    -> student
//   DELETE /api/students/:id    -> { message }
export const getStudents = () => api.get("/students").then((r) => r.data);
export const getStudent = (id) => api.get(`/students/${id}`).then((r) => r.data);
export const createStudent = (data) => api.post("/students", data).then((r) => r.data);
export const updateStudent = (id, data) =>
  api.put(`/students/${id}`, data).then((r) => r.data);
export const deleteStudent = (id) => api.delete(`/students/${id}`).then((r) => r.data);

export function errorMessage(err) {
  if (err.response?.data?.message) return err.response.data.message;
  if (err.code === "ERR_NETWORK")
    return "Can't reach the server. Check that the backend is running.";
  return err.message || "Something went wrong. Try again.";
}
