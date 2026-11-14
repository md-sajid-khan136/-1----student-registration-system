import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm.jsx";
import IdCardPreview from "../components/IdCardPreview.jsx";
import { createStudent, errorMessage } from "../api/students.js";
import { EMPTY_STUDENT } from "../constants.js";

export default function RegisterPage() {
  const [values, setValues] = useState(EMPTY_STUDENT);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setServerError("");
    try {
      await createStudent({ ...data, semester: Number(data.semester) });
      navigate("/students", { state: { notice: `${data.fullName} registered.` } });
    } catch (err) {
      setServerError(errorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <div className="split">
      <section>
        <h1>Register a student</h1>
        <p className="lede">Fill in the details. The ID card updates as you type.</p>
        <StudentForm
          values={values}
          onChange={setValues}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Register student"
          serverError={serverError}
        />
      </section>
      <IdCardPreview values={values} />
    </div>
  );
}
