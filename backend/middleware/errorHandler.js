const FRIENDLY_DUPLICATES = {
  rollNumber: "A student with this roll number already exists.",
  email: "A student with this email is already registered.",
};

module.exports = (err, req, res, next) => {
  // Duplicate roll number or email (unique index)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0];
    return res.status(409).json({ message: FRIENDLY_DUPLICATES[field] || "This record already exists." });
  }

  // Schema validation errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((e) => e.message).join(" ");
    return res.status(400).json({ message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "One of the values has the wrong format." });
  }

  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({ message: status === 500 ? "Server error. Try again." : err.message });
};
