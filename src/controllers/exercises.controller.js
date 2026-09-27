// Estado en memoria (simulación)
let exercises = [
  {
    id: "1",
    name: "Press de banca",
    description:
      "Ejercicio compuesto que trabaja pectorales, hombros y tríceps acostado sobre un banco.",
    weight: "60", // peso en kilogramos
    reps: "10", // repeticiones
    category: "fuerza",
    createdAt: "2025-09-12T12:00:00Z",
  },
  {
    id: "2",
    name: "Sentadilla",
    description:
      "Ejercicio compuesto que fortalece cuádriceps, glúteos y zona lumbar.",
    weight: "80", // peso en kilogramos
    reps: "12", // repeticiones
    category: "fuerza",
    createdAt: "2025-09-13T08:00:00Z",
  },
];

// GET /api/v1/exercises
const getExercises = (req, res) => {
  res.status(200).json(exercises);
};

// GET /exercises/:id
const getExercisesById = (req, res) => {
  const { id } = req.params; // 1
  const exercise = exercises.find((u) => u.id === id); // 2

  if (!exercise) {
    // 3
    return res.status(404).json({ error: "Ejercicio no encontrado" });
  }

  res.status(200).json(exercise); // 4
};

// POST /exercises
const createExercise = (req, res) => {
  const { name, description, weight, reps, category } = req.body; // 1

  if (!name || !description || !category) {
    // 2
    return res
      .status(400)
      .json({ error: "Name, description y category son requeridos" });
  }

  const newExercise = {
    // 3
    id: `${Date.now()}`, // identificador temporal
    name,
    description,
    weight,
    reps: reps || "12",
    category,
    createdAt: new Date().toISOString(),
  };

  exercises.push(newExercise); // 4

  res.status(201).json(newExercise); // 5
};

// PUT /exercises/:id
const updateExercise = (req, res) => {
  const { id } = req.params; // 1
  const { name, description, weight, reps, category } = req.body; // 1

  const index = exercises.findIndex((u) => u.id === id); // 3
  if (index === -1) {
    // 4
    return res.status(404).json({ error: "Ejercicio no encontrado" });
  }

  if (!name || !description || !category) {
    // 2
    return res
      .status(400)
      .json({ error: "Name, description y category son requeridos" });
  }

  exercises[index] = {
    // 6
    ...exercises[index], // conserva los datos previos
    name,
    description,
    weight: weight || "5",
    reps: reps || "12",
    category,
  };

  res.status(200).json(exercises[index]); // 7
};

// PATCH /exercises/:id
const patchExercise = (req, res) => {
  const { id } = req.params;
  const updates = req.body; // Campos opcionales enviados por el cliente

  // 1. Buscar si el ejercicio existe
  const index = exercises.findIndex((u) => u.id === id);
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
  exercises[index] = {
    ...exercises[index],
    ...updates,
  };

  // 4. Responder con el ejercicio actualizado
  res.status(200).json(exercises[index]);
};

// DELETE /exercises/:id
const deleteExercise = (req, res) => {
  const { id } = req.params; // 1
  const index = exercises.findIndex((u) => u.id === id); // 2

  if (index === -1) {
    // 3
    return res.status(404).json({ error: "Ejercicio no encontrado" });
  }

  const deletedExercise = exercises.splice(index, 1); // 4
  res.status(200).json({ deleted: deletedExercise[0].id }); // 5
};

module.exports = {
  getExercises,
  getExercisesById,
  createExercise,
  updateExercise,
  patchExercise,
  deleteExercise,
};
