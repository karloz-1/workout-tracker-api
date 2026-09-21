const express = require("express");
const router = express.Router();

// Estado en memoria (simulación)
let users = [
  {
    id: "1",
    name: "Carlos Navia",
    email: "carlos@example.com",
    role: "user",
    createdAt: "2025-09-12T12:00:00Z",
  },
];

// GET /api/v1/users
router.get("/", (req, res) => {
  res.status(200).json(users);
});

// GET /users/:id
router.get("/:id", (req, res) => {
  const { id } = req.params; // 1
  const user = users.find((u) => u.id === id); // 2

  if (!user) {
    // 3
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.status(200).json(user); // 4
});

// POST /users
router.post("/", (req, res) => {
  const { name, email, role } = req.body; // 1

  if (!name || !email) {
    // 2
    return res.status(400).json({ error: "Name y email son requeridos" });
  }

  const newUser = {
    // 3
    id: `${Date.now()}`, // identificador temporal
    name,
    email,
    role: role || "user", // valor por defecto si no envían rol
    createdAt: new Date().toISOString(),
  };

  users.push(newUser); // 4

  res.status(201).json(newUser); // 5
});

// PUT /users/:id
router.put("/:id", (req, res) => {
  const { id } = req.params; // 1
  const { name, email, role } = req.body; // 2

  const index = users.findIndex((u) => u.id === id); // 3
  if (index === -1) {
    // 4
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (!name || !email) {
    // 5
    return res.status(400).json({ error: "Name y email son requeridos" });
  }

  users[index] = {
    // 6
    ...users[index], // conserva los datos previos
    name,
    email,
    role,
  };

  res.status(200).json(users[index]); // 7
});

// DELETE /users/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params; // 1
  const index = users.findIndex((u) => u.id === id); // 2

  if (index === -1) {
    // 3
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const deletedUser = users.splice(index, 1); // 4
  res.status(200).json({ deleted: deletedUser[0].id }); // 5
});

// GET /users?role=user&search=Carlos
router.get("/", (req, res) => {
  const { role, search } = req.query; // 1
  let result = users; // 2

  if (role) {
    // 3
    result = result.filter((u) => u.role === role);
  }

  if (search) {
    // 4
    result = result.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  res.status(200).json(result); // 5
});

module.exports = router;
