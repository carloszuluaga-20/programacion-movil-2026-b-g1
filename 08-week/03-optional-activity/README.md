
# Semana 8 - API REST con Express y consumo desde la app

## Objetivo

Crear una API REST básica con Express utilizando los métodos GET y POST, probar los endpoints y consumir la información mediante funciones `fetch` con manejo de errores.

## 1. API REST con Express

Se creó una API REST para manejar una entidad llamada `tareas`.

La API se encuentra en:

`api/server.js`

Se utilizaron las dependencias:

- Express
- CORS

Para instalar las dependencias se utilizaron los siguientes comandos:

```bash
npm init -y
npm install express cors
```

La API se ejecuta con:

```bash
node server.js
```

El servidor utiliza el puerto:

```text
http://localhost:3000
```

## 2. Endpoint GET /tareas

El endpoint GET permite obtener la lista de tareas.

Ruta:

```text
GET http://localhost:3000/tareas
```

Ejemplo de respuesta:

```json
[
  {
    "id": 1,
    "titulo": "Estudiar Programación Móvil",
    "completada": false
  },
  {
    "id": 2,
    "titulo": "Realizar actividad Semana 8",
    "completada": false
  }
]
```

Este endpoint fue probado correctamente desde el navegador.

## 3. Endpoint POST /tareas

El endpoint POST permite crear una nueva tarea.

Ruta:

```text
POST http://localhost:3000/tareas
```

Ejemplo de información enviada:

```json
{
  "titulo": "Estudiar para el quiz"
}
```

La prueba se realizó desde PowerShell utilizando:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/tareas" -Method POST -ContentType "application/json" -Body '{"titulo":"Estudiar para el quiz"}'
```

Respuesta obtenida:

```text
id titulo                 completada
3  Estudiar para el quiz  False
```

Después de realizar el POST, la nueva tarea apareció correctamente al consultar nuevamente el endpoint GET.

## 4. Código de la API

Archivo:

`api/server.js`

Código:

```javascript
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
```

## 5. Consumo de la API con fetch

Se creó el archivo:

`app/api.js`

Este archivo contiene una función para listar las tareas y otra para crear una nueva tarea.

### Listar tareas

La función `listarTareas()` realiza una petición GET al endpoint `/tareas`.

```javascript
export async function listarTareas() {
  try {
    const respuesta = await fetch('http://localhost:3000/tareas');

    if (!respuesta.ok) {
      throw new Error('Error al obtener las tareas');
    }

    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
```

### Crear tarea

La función `crearTarea()` realiza una petición POST al endpoint `/tareas`.

```javascript
export async function crearTarea(titulo) {
  try {
    const respuesta = await fetch('http://localhost:3000/tareas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ titulo })
    });

    if (!respuesta.ok) {
      throw new Error('Error al crear la tarea');
    }

    const nuevaTarea = await respuesta.json();
    return nuevaTarea;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

## 6. Manejo de errores

Las dos funciones utilizan `try/catch` para manejar posibles errores durante las peticiones.

También se utiliza:

```javascript
if (!respuesta.ok)
```

para comprobar si la respuesta del servidor fue correcta.

## Resultado

Se creó una API REST con Express que permite listar y crear tareas utilizando los métodos GET y POST.

Los endpoints fueron probados correctamente y se crearon funciones `fetch` para consumir la API con manejo de errores.

## Evidencias

### GET /tareas - Estado inicial

En esta prueba se consultó el endpoint `GET /tareas` desde el navegador.

La API respondió correctamente con las tareas almacenadas inicialmente.

<img width="1852" height="920" alt="Captura de pantalla 2026-10-02 170601" src="https://github.com/user-attachments/assets/f961fc5e-2026-4a0a-8a41-1f580eae7133" />


### POST /tareas - Creación de una tarea

Se probó el endpoint `POST /tareas` desde PowerShell.

Se envió una nueva tarea con el título `Estudiar para el quiz` y la API respondió con la tarea creada y el identificador `3`.

<img width="1447" height="162" alt="Captura de pantalla 2026-10-02 170752" src="https://github.com/user-attachments/assets/66ea4be5-322d-4db4-b00f-c2cc60688ab3" />

### GET /tareas - Después del POST

Después de crear la nueva tarea se consultó nuevamente el endpoint `GET /tareas`.

La respuesta muestra las tres tareas, confirmando que la nueva tarea fue agregada correctamente.

<img width="1892" height="936" alt="Captura de pantalla 2026-10-02 171115" src="https://github.com/user-attachments/assets/5f8630df-3822-49d4-a95e-a9cf1bf7772b" />
