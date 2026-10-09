const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tareas = [
  {
    id: 1,
    titulo: "Estudiar Ionic",
    descripcion: "Repasar componentes y navegación"
  },
  {
    id: 2,
    titulo: "Practicar Express",
    descripcion: "Probar endpoints GET y POST"
  }
];

app.get("/tasks", (req, res) => {
  res.json(tareas);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) {
    return res.status(404).json({
      error: "Tarea no encontrada"
    });
  }

  res.json(tarea);
});

app.post("/tasks", (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo || !descripcion) {
    return res.status(400).json({
      error: "Titulo y descripcion son obligatorios"
    });
  }

  const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
    descripcion
  };

  tareas.push(nuevaTarea);

  res.status(201).json(nuevaTarea);
});

app.listen(3000, () => {
  console.log("API ejecutándose en http://localhost:3000");
});