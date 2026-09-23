const express = require("express");
const router = express.Router();

const {
  getExercises,
  getExercisesById,
  createExercise,
  updateExercise,
  deleteExercise,
} = require("../../controllers/exercises.controller.js");

router.get("/", getExercises);
router.get("/:id", getExercisesById);
router.post("/", createExercise);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

module.exports = router;
