const express = require("express"); // Import express
const app = express(); // Create an instance of express
const { port } = require("./config/env"); // Import the port from the env file
const routes = require("./routes");

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Configurar rutas con prefijo /api
// app.use("/api", routes);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
