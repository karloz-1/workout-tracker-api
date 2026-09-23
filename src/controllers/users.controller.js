// Estado en memoria (simulación)
let users = [
  {
    id: "1",
    name: "Sofía Martínez",
    email: "sofia.martinez@gmail.com",
    role: "admin",
    createdAt: "2025-09-12T12:00:00Z",
  },
  {
    id: "2",
    name: "Andrés Ramírez",
    email: "andres.ramirez@hotmail.com",
    role: "user",
    createdAt: "2025-09-15T10:30:00Z",
  },
];

// GET /api/v1/users
const getUsers = (req, res) => {
  res.status(200).json(users);
};

// GET /users/:id
const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.status(200).json(user);
};

// POST /users
const createUser = (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name y email son requeridos" });
  }

  const newUser = {
    id: `${Date.now()}`,
    name,
    email,
    role: role || "user",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

// PUT /users/:id
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (!name || !email) {
    return res.status(400).json({ error: "Name y email son requeridos" });
  }

  users[index] = {
    ...users[index],
    name,
    email,
    role,
  };

  res.status(200).json(users[index]);
};

// DELETE /users/:id
const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const deletedUser = users.splice(index, 1);
  res.status(200).json({ deleted: deletedUser[0].id });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
