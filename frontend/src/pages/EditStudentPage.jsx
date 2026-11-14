import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import StudentForm from "../components/StudentForm.jsx";
import IdCardPreview from "../components/IdCardPreview.jsx";
import { getStudent, updateStudent, errorMessage } from "../api/students.js";
import { EMPTY_STUDENT } from "../constants.js";

export default function EditStudentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    getStudent(id)
      .then((s) =>
        setValues({
          ...EMPTY_STUDENT,
          ...s,
          dateOfBirth: s.dateOfBirth ? String(s.dateOfBirth).slice(0, 10) : "",
          semester: s.semester ? String(s.semester) : "",
          address: s.address || "",
        })
      )
      .catch((err) => setLoadError(errorMessage(err)));
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setServerError("");
    try {
      await updateStudent(id, { ...data, semester: Number(data.semester) });
      navigate("/students", { state: { notice: `${data.fullName} updated.` } });
    } catch (err) {
      setServerError(errorMessage(err));
      setSubmitting(false);
    }
  };

  if (loadError)
    return (
      <div className="empty">
        <h2>Couldn't load this student</h2>
        <p>{loadError}</p>
        <Link className="btn" to="/students">Back to all students</Link>
      </div>
    );
  if (!values) return <p className="status">Loading student...</p>;

  return (
    <div className="split">
      <section>
        <h1>Edit student</h1>
        <p className="lede">Change any detail, then save.</p>
        <StudentForm
          values={values}
          onChange={setValues}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Save changes"
          serverError={serverError}
        />
      </section>
      <IdCardPreview values={values} />
    </div>
  );
}
