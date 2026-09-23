// Estado en memoria (simulación)
let workouts = [
  {
    id: "1",
    title: "Fuerza básica",
    description:
      "Sesión de fuerza con press de banca y sentadilla, 3 series de 8 a 12 repeticiones.",
    exercises: [1, 2],
    createdAt: "2026-01-30T18:00:00Z",
  },
  {
    id: "2",
    title: "Cardio HIIT",
    description:
      "Intervalos de alta intensidad en cinta, 8 rondas de 1 minuto con 30 segundos de descanso.",
    exercises: [1, 2],
    createdAt: "2026-02-02T07:30:00Z",
  },
];

// GET /api/v1/workouts
const getWorkouts = (req, res) => {
  res.status(200).json(workouts);
};

// GET /workouts/:id
const getWorkoutById = (req, res) => {
  const { id } = req.params; // 1
  const workout = workouts.find((u) => u.id === id); // 2

  if (!workout) {
    // 3
    return res.status(404).json({ error: "Entrenamiento no encontrado" });
  }

  res.status(200).json(workout); // 4
};

// POST /workouts
const createWorkout = (req, res) => {
  const { title, description, exercises } = req.body; // 1

  if (!title || !description || !exercises) {
    // 2
    return res
      .status(400)
      .json({ error: "Title, description y exercises son requeridos" });
  }

  const newWorkout = {
    // 3
    id: `${Date.now()}`, // identificador temporal
    title,
    description,
    exercises,
    createdAt: new Date().toISOString(),
  };

  workouts.push(newWorkout); // 4

  res.status(201).json(newWorkout); // 5
};

// PUT /workouts/:id
const updateWorkout = (req, res) => {
  const { id } = req.params; // 1
  const { title, description, exercises } = req.body; // 1

  const index = workouts.findIndex((u) => u.id === id); // 3
  if (index === -1) {
    // 4
    return res.status(404).json({ error: "Entrenamiento no encontrado" });
  }

  if (!title || !description || !exercises) {
    // 2
    return res
      .status(400)
      .json({ error: "Title, description y exercises son requeridos" });
  }

  workouts[index] = {
    // 6
    ...workouts[index], // conserva los datos previos
    title,
    description,
    exercises,
  };

  res.status(200).json(workouts[index]); // 7
};

// DELETE /workouts/:id
const deleteWorkout = (req, res) => {
  const { id } = req.params; // 1
  const index = workouts.findIndex((u) => u.id === id); // 2

  if (index === -1) {
    // 3
    return res.status(404).json({ error: "Entrenamiento no encontrado" });
  }

  const deletedWorkout = workouts.splice(index, 1); // 4
  res.status(200).json({ deleted: deletedWorkout[0].id }); // 5
};

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
