const express = require("express");
const router = express.Router();

// Importar rutas especificas
const usersRoutes = require("./users.routes");
const workoutsRoutes = require("./workouts.routes");
const exercisesRoutes = require("./exercises.routes");

// Configurar las rutas
router.use("/users", usersRoutes);
router.use("/workouts", workoutsRoutes);
router.use("/exercises", exercisesRoutes);
module.exports = router;
