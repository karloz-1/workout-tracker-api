const express = require("express");
const router = express.Router();

// Importar las funciones desde el controlador
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
} = require("../../controllers/users.controller.js");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

module.exports = router;
