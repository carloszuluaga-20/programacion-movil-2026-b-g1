const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tareas = [
  {
    id: 1,
    titulo: 'Estudiar Programación Móvil',
    completada: false
  },
  {
    id: 2,
    titulo: 'Realizar actividad Semana 8',
    completada: false
  }
];

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.post('/tareas', (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({
      error: 'El título es obligatorio'
    });
  }

  const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
    completada: false
  };

  tareas.push(nuevaTarea);

  res.status(201).json(nuevaTarea);
});

app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});