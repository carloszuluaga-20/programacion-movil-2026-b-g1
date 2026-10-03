const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tareas = [
  {
    id: 1,
    titulo: 'Terminar actividad de Programación Móvil',
    descripcion: 'Completar la app Ionic React y probar la API'
  },
  {
    id: 2,
    titulo: 'Estudiar para el quiz',
    descripcion: 'Repasar los temas vistos en clase'
  }
];

app.get('/tareas', (req, res) => {
  try {
    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener las tareas'
    });
  }
});

app.post('/tareas', (req, res) => {
  try {
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({
        error: 'El título y la descripción son obligatorios'
      });
    }

    const nuevaTarea = {
      id: tareas.length + 1,
      titulo,
      descripcion
    };

    tareas.push(nuevaTarea);

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear la tarea'
    });
  }
});

app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});