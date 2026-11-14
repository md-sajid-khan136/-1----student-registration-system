const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, "Full name is required"], trim: true, maxlength: 100 },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
      trim: true,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
      match: [/^\+?[0-9\s-]{7,15}$/, "Enter a valid phone number"],
    },
    dateOfBirth: { type: Date, required: [true, "Date of birth is required"] },
    gender: { type: String, required: [true, "Gender is required"], enum: ["Female", "Male", "Other"] },
    department: { type: String, required: [true, "Department is required"], trim: true },
    semester: { type: Number, required: [true, "Semester is required"], min: 1, max: 8 },
    address: { type: String, trim: true, maxlength: 300, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
