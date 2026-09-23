const express = require("express");
const router = express.Router();

const {
  getProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
} = require("../../controllers/progress.controller.js");

router.get("/", getProgress);
router.get("/:id", getProgressById);
router.post("/", createProgress);
router.put("/:id", updateProgress);
router.delete("/:id", deleteProgress);

module.exports = router;
