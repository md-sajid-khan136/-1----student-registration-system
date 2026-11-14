import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getStudents, deleteStudent, errorMessage } from "../api/students.js";
import { DEPARTMENTS } from "../constants.js";

export default function StudentsPage() {
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(location.state?.notice || "");
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return students.filter(
      (s) =>
        (!department || s.department === department) &&
        (!q ||
          s.fullName?.toLowerCase().includes(q) ||
          s.rollNumber?.toLowerCase().includes(q) ||
          s.email?.toLowerCase().includes(q))
    );
  }, [students, query, department]);

  const handleDelete = async (student) => {
    try {
      await deleteStudent(student._id);
      setStudents((prev) => prev.filter((s) => s._id !== student._id));
      setNotice(`${student.fullName} deleted.`);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setConfirmId(null);
    }
  };

  return (
    <section>
      <div className="pagehead">
        <h1>All students</h1>
        <Link className="btn btn--primary" to="/register">Register student</Link>
      </div>

      {notice && (
        <div className="banner banner--ok" role="status">
          {notice}
          <button className="linklike" onClick={() => setNotice("")}>Dismiss</button>
        </div>
      )}
      {error && <div className="banner banner--error" role="alert">{error}</div>}

      <div className="filters">
        <input
          type="search"
          placeholder="Search by name, roll number or email"
          aria-label="Search students"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select aria-label="Filter by department" value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="status">Loading students...</p>
      ) : students.length === 0 && !error ? (
        <div className="empty">
          <h2>No students yet</h2>
          <p>Register the first student to see them here.</p>
          <Link className="btn btn--primary" to="/register">Register student</Link>
        </div>
      ) : visible.length === 0 ? (
        <p className="status">No students match your search.</p>
      ) : (
        <>
          <p className="count">{visible.length} of {students.length} students</p>
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll number</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {visible.map((s) => (
                  <tr key={s._id}>
                    <td>{s.fullName}</td>
                    <td>{s.rollNumber}</td>
                    <td>{s.department}</td>
                    <td>{s.semester}</td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>
                    <td className="actions">
                      <Link className="btn btn--small" to={`/students/${s._id}/edit`}>Edit</Link>
                      {confirmId === s._id ? (
                        <>
                          <button className="btn btn--small btn--danger" onClick={() => handleDelete(s)}>
                            Confirm delete
                          </button>
                          <button className="btn btn--small" onClick={() => setConfirmId(null)}>Cancel</button>
                        </>
                      ) : (
                        <button className="btn btn--small" onClick={() => setConfirmId(s._id)}>Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
