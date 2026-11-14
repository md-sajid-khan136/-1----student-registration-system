const mongoose = require("mongoose");
const Student = require("../models/Student");

const FIELDS = [
  "fullName",
  "rollNumber",
  "email",
  "phone",
  "dateOfBirth",
  "gender",
  "department",
  "semester",
  "address",
];

// Only accept known fields, so clients can't set _id, createdAt, etc.
const pickFields = (body) =>
  FIELDS.reduce((acc, key) => {
    if (body[key] !== undefined) acc[key] = body[key];
    return acc;
  }, {});

const httpError = (status, message) => Object.assign(new Error(message), { status });

const checkId = (id) => {
  if (!mongoose.isValidObjectId(id)) throw httpError(400, "That student ID isn't valid.");
};

exports.getStudents = async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
};

exports.getStudent = async (req, res) => {
  checkId(req.params.id);
  const student = await Student.findById(req.params.id);
  if (!student) throw httpError(404, "Student not found.");
  res.json(student);
};

exports.createStudent = async (req, res) => {
  const student = await Student.create(pickFields(req.body));
  res.status(201).json(student);
};

exports.updateStudent = async (req, res) => {
  checkId(req.params.id);
  const student = await Student.findByIdAndUpdate(req.params.id, pickFields(req.body), {
    new: true,
    runValidators: true,
  });
  if (!student) throw httpError(404, "Student not found.");
  res.json(student);
};

exports.deleteStudent = async (req, res) => {
  checkId(req.params.id);
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) throw httpError(404, "Student not found.");
  res.json({ message: "Student deleted." });
};
