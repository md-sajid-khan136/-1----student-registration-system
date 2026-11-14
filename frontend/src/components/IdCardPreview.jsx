import { INSTITUTION_NAME } from "../constants.js";

function initials(name) {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join("") || "?"
  );
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// A live student ID card that fills in as the form is completed.
export default function IdCardPreview({ values }) {
  const row = (label, value) => (
    <div className="idcard__row">
      <dt>{label}</dt>
      <dd className={value ? "" : "idcard__blank"}>{value || "Not filled in"}</dd>
    </div>
  );

  return (
    <aside className="idcard" aria-label="Student ID card preview">
      <div className="idcard__head">{INSTITUTION_NAME}</div>
      <div className="idcard__body">
        <div className="idcard__avatar" aria-hidden="true">
          {initials(values.fullName)}
        </div>
        <h2 className="idcard__name">{values.fullName || "Student name"}</h2>
        <p className="idcard__roll">{values.rollNumber || "Roll number"}</p>
        <dl>
          {row("Department", values.department)}
          {row("Semester", values.semester && `Semester ${values.semester}`)}
          {row("Born", formatDate(values.dateOfBirth))}
          {row("Email", values.email)}
          {row("Phone", values.phone)}
        </dl>
      </div>
    </aside>
  );
}
