import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import StudentsPage from "./pages/StudentsPage.jsx";
import EditStudentPage from "./pages/EditStudentPage.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/students/:id/edit" element={<EditStudentPage />} />
          <Route
            path="*"
            element={
              <div className="empty">
                <h2>Page not found</h2>
                <p>Check the address, or go back to the student list.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}
