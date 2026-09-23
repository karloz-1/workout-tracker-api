// Estado en memoria (simulación)
let progress = [
  {
    id: "1",
    idExercise: "1",
    weight: "60",
    reps: "10",
    createdAt: "2025-09-12T12:00:00Z",
  },
  {
    id: "2",
    idExercise: "2",
    weight: "80",
    reps: "12",
    createdAt: "2025-09-14T18:45:00Z",
  },
];

// GET /api/v1/progress
const getProgress = (req, res) => {
  res.status(200).json(progress);
};

// GET /progress/:id
const getProgressById = (req, res) => {
  const { id } = req.params; // 1
  const progress = progress.find((u) => u.id === id); // 2

  if (!progress) {
    // 3
    return res.status(404).json({ error: "Progreso no encontrado" });
  }

  res.status(200).json(progress); // 4
};

// POST /progress
const createProgress = (req, res) => {
  const { idExercise, weight, reps } = req.body; // 1

  if (!idExercise || !weight || !reps) {
    // 2
    return res
      .status(400)
      .json({ error: "IdExercise, weight y reps son requeridos" });
  }

  const newprogress = {
    // 3
    id: `${Date.now()}`, // identificador temporal
    idExercise,
    weight,
    reps,
    createdAt: new Date().toISOString(),
  };

  progress.push(newprogress); // 4

  res.status(201).json(newprogress); // 5
};

// PUT /progress/:id
const updateProgress = (req, res) => {
  const { id } = req.params; // 1
  const { idExercise, weight, reps } = req.body; // 1

  const index = progress.findIndex((u) => u.id === id); // 3
  if (index === -1) {
    // 4
    return res.status(404).json({ error: "Progreso no encontrado" });
  }

  if (!idExercise || !weight || !reps) {
    // 2
    return res
      .status(400)
      .json({ error: "IdExercise, weight y reps son requeridos" });
  }

  progress[index] = {
    // 6
    ...progress[index], // conserva los datos previos
    idExercise,
    weight,
    reps,
  };

  res.status(200).json(progress[index]); // 7
};

// DELETE /progress/:id
const deleteProgress = (req, res) => {
  const { id } = req.params; // 1
  const index = progress.findIndex((u) => u.id === id); // 2

  if (index === -1) {
    // 3
    return res.status(404).json({ error: "Progreso no encontrado" });
  }

  const deletedprogress = progress.splice(index, 1); // 4
  res.status(200).json({ deleted: deletedprogress[0].id }); // 5
};

module.exports = {
  getProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
};
