const express = require("express");
const c = require("../controllers/studentController");

const router = express.Router();

// Express 4 doesn't catch rejected promises, so wrap each handler.
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.route("/").get(wrap(c.getStudents)).post(wrap(c.createStudent));
router.route("/:id").get(wrap(c.getStudent)).put(wrap(c.updateStudent)).delete(wrap(c.deleteStudent));

module.exports = router;
