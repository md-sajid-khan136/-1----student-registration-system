export const INSTITUTION_NAME =
  import.meta.env.VITE_INSTITUTION_NAME || "Your College Name";

export const DEPARTMENTS = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "English",
  "Physics",
  "Mathematics",
];

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const GENDERS = ["Female", "Male", "Other"];

export const EMPTY_STUDENT = {
  fullName: "",
  rollNumber: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  department: "",
  semester: "",
  address: "",
};
