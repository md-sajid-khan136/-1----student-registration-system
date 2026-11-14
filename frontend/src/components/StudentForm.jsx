import { useState } from "react";
import { DEPARTMENTS, SEMESTERS, GENDERS } from "../constants.js";

function validate(v) {
  const e = {};
  if (!v.fullName.trim()) e.fullName = "Enter the student's full name.";
  if (!v.rollNumber.trim()) e.rollNumber = "Enter a roll number.";
  if (!v.email.trim()) e.email = "Enter an email address.";
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email, like name@example.com.";
  if (!v.phone.trim()) e.phone = "Enter a phone number.";
  else if (!/^\+?[0-9\s-]{7,15}$/.test(v.phone)) e.phone = "Use 7 to 15 digits. Spaces, dashes and a leading + are fine.";
  if (!v.dateOfBirth) e.dateOfBirth = "Choose a date of birth.";
  else if (new Date(v.dateOfBirth) > new Date()) e.dateOfBirth = "Date of birth can't be in the future.";
  if (!v.gender) e.gender = "Choose a gender.";
  if (!v.department) e.department = "Choose a department.";
  if (!v.semester) e.semester = "Choose a semester.";
  return e;
}

export default function StudentForm({ values, onChange, onSubmit, submitting, submitLabel, serverError }) {
  const [errors, setErrors] = useState({});

  const update = (e) => {
    const { name, value } = e.target;
    onChange({ ...values, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(values);
    else document.getElementById(Object.keys(found)[0])?.focus();
  };

  const field = (name, label, input) => (
    <div className={`field ${errors[name] ? "field--error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      {input}
      {errors[name] && (
        <p className="field__error" id={`${name}-error`} role="alert">
          {errors[name]}
        </p>
      )}
    </div>
  );

  const common = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: update,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {serverError && (
        <div className="banner banner--error" role="alert">
          {serverError}
        </div>
      )}

      <div className="form__grid">
        {field("fullName", "Full name", <input type="text" autoComplete="name" {...common("fullName")} />)}
        {field("rollNumber", "Roll number", <input type="text" {...common("rollNumber")} />)}
        {field("email", "Email", <input type="email" autoComplete="email" {...common("email")} />)}
        {field("phone", "Phone", <input type="tel" autoComplete="tel" {...common("phone")} />)}
        {field("dateOfBirth", "Date of birth", <input type="date" {...common("dateOfBirth")} />)}
        {field(
          "gender",
          "Gender",
          <select {...common("gender")}>
            <option value="">Choose one</option>
            {GENDERS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        )}
        {field(
          "department",
          "Department",
          <select {...common("department")}>
            <option value="">Choose one</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        )}
        {field(
          "semester",
          "Semester",
          <select {...common("semester")}>
            <option value="">Choose one</option>
            {SEMESTERS.map((s) => (
              <option key={s} value={s}>Semester {s}</option>
            ))}
          </select>
        )}
      </div>

      <div className="field">
        <label htmlFor="address">Address (optional)</label>
        <textarea id="address" name="address" rows="3" value={values.address} onChange={update} />
      </div>

      <button className="btn btn--primary" type="submit" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
