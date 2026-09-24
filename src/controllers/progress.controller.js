// Estado en memoria (simulación)
let progress = [
  {
    id: "1",
    idProgress: "1",
    weight: "60",
    reps: "10",
    createdAt: "2025-09-12T12:00:00Z",
  },
  {
    id: "2",
    idProgress: "2",
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
  const findProgress = progress.find((u) => u.id === id); // 2

  if (!findProgress) {
    // 3
    return res.status(404).json({ error: "Progreso no encontrado" });
  }

  res.status(200).json(findProgress); // 4
};

// POST /progress
const createProgress = (req, res) => {
  const { idProgress, weight, reps } = req.body; // 1

  if (!idProgress || !weight || !reps) {
    // 2
    return res
      .status(400)
      .json({ error: "IdProgress, weight y reps son requeridos" });
  }

  const newprogress = {
    // 3
    id: `${Date.now()}`, // identificador temporal
    idProgress,
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
  const { idProgress, weight, reps } = req.body; // 1

  const index = progress.findIndex((u) => u.id === id); // 3
  if (index === -1) {
    // 4
    return res.status(404).json({ error: "Progreso no encontrado" });
  }

  if (!idProgress || !weight || !reps) {
    // 2
    return res
      .status(400)
      .json({ error: "IdProgress, weight y reps son requeridos" });
  }

  progress[index] = {
    // 6
    ...progress[index], // conserva los datos previos
    idProgress,
    weight,
    reps,
  };

  res.status(200).json(progress[index]); // 7
};

// PATCH /progress/:id
const patchProgress = (req, res) => {
  const { id } = req.params;
  const updates = req.body; // Campos opcionales enviados por el cliente

  // 1. Buscar si el ejercicio existe
  const index = progress.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Ejercicio no encontrado" });
  }

  // 2. Validar que al menos se envíe un campo para actualizar
  if (Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ error: "Debe proporcionar al menos un campo para actualizar" });
  }

  // 3. Sobrescribir únicamente los campos recibidos manteniendo el resto
  progress[index] = {
    ...progress[index],
    ...updates,
  };

  // 4. Responder con el ejercicio actualizado
  res.status(200).json(progress[index]);
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
  patchProgress,
  deleteProgress,
};
