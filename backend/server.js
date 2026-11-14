require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/students");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const allowed = (process.env.CLIENT_URL || "")
  .split(",")
  .map((s) => s.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    // With no CLIENT_URL set (local dev), allow any origin.
    origin: allowed.length ? allowed : true,
  })
);
app.use(express.json());

app.get("/", (req, res) => res.json({ status: "ok", service: "student-registration-api" }));
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/students", studentRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found." }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`API running on port ${PORT}`)))
  .catch((err) => {
    console.error("Failed to start:", err.message);
    process.exit(1);
  });
