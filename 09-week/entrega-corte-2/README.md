# Actividad calificable - Corte 2

## App Ionic React + API REST

Este proyecto corresponde a la actividad calificable del Corte 2 de Programación Móvil.

La aplicación permite consultar una lista de tareas desde una API REST desarrollada con Express, crear nuevas tareas desde un formulario en Ionic React y navegar hacia una pantalla de detalle.

---

## Tecnologías utilizadas

- Node.js
- Express
- CORS
- Ionic React
- React
- TypeScript
- React Router
- Fetch API

---

## Estructura del proyecto

```text
entrega-corte-2/
├── api/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── app/
│   └── tareasApp/
│       ├── src/
│       │   ├── pages/
│       │   │   ├── Home.tsx
│       │   │   └── Detalle.tsx
│       │   └── App.tsx
│       └── ...
│
└── README.md
```

---

## 1. API REST con Express

La API fue desarrollada con Express y utiliza JSON para enviar y recibir información.

La entidad utilizada es `tarea`.

Cada tarea contiene:

- `id`
- `titulo`
- `descripcion`

La API se ejecuta en:

```text
http://localhost:3000
```

Para iniciar la API:

```bash
cd api
node server.js
```

---

## 2. Endpoint GET /tareas

El endpoint GET permite obtener todas las tareas almacenadas en la API.

Ruta:

```text
GET http://localhost:3000/tareas
```

Ejemplo de respuesta:

```json
[
  {
    "id": 1,
    "titulo": "Terminar actividad de Programación Móvil",
    "descripcion": "Completar la app Ionic React y probar la API"
  },
  {
    "id": 2,
    "titulo": "Estudiar para el quiz",
    "descripcion": "Repasar los temas vistos en clase"
  }
]
```

Este endpoint fue probado correctamente desde el navegador.

---

## 3. Endpoint POST /tareas

El endpoint POST permite crear una nueva tarea.

Ruta:

```text
POST http://localhost:3000/tareas
```

Ejemplo de JSON enviado:

```json
{
  "titulo": "Preparar entrega final",
  "descripcion": "Revisar la app antes de subirla a GitHub"
}
```

La API valida que el título y la descripción no estén vacíos.

Si alguno de los campos está vacío, devuelve un error con código `400`.

Cuando la tarea se crea correctamente, devuelve código `201`.

---

## 4. Aplicación Ionic React

La aplicación Ionic React se encuentra dentro de:

```text
app/tareasApp
```

Para ejecutar la aplicación:

```bash
cd app/tareasApp
ionic serve
```

La aplicación se ejecuta normalmente en:

```text
http://localhost:8100
```

---

## 5. Pantalla principal

La pantalla principal permite:

- Consultar las tareas existentes.
- Crear una nueva tarea.
- Mostrar mensajes de error.
- Mostrar un indicador de carga.
- Navegar al detalle de una tarea.

La pantalla consume la API utilizando `fetch`.

---

## 6. Uso de fetch

Para listar las tareas se realiza una petición GET:

```tsx
const respuesta = await fetch('http://localhost:3000/tareas');
```

Después la respuesta se convierte a JSON y se guarda en el estado:

```tsx
const datos = await respuesta.json();
setTareas(datos);
```

Para crear una nueva tarea se realiza una petición POST:

```tsx
const respuesta = await fetch('http://localhost:3000/tareas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    titulo,
    descripcion
  })
});
```

---

## 7. Manejo de estado con useState

La aplicación utiliza `useState` para manejar diferentes estados.

Ejemplo:

```tsx
const [tareas, setTareas] = useState<Tarea[]>([]);
const [titulo, setTitulo] = useState('');
const [descripcion, setDescripcion] = useState('');
const [cargando, setCargando] = useState(true);
const [error, setError] = useState('');
```

Estos estados permiten manejar:

- Lista de tareas.
- Título del formulario.
- Descripción del formulario.
- Estado de carga.
- Mensajes de error.

---

## 8. Manejo de errores

Las peticiones a la API utilizan bloques `try/catch`.

Ejemplo:

```tsx
try {
  const respuesta = await fetch('http://localhost:3000/tareas');

  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar las tareas');
  }
} catch (err) {
  setError('Error de red al cargar las tareas');
}
```

Si ocurre un problema de red, la aplicación muestra un mensaje al usuario.

También se valida que el título y la descripción no estén vacíos antes de crear una tarea.

---

## 9. Navegación a detalle

Cada tarea de la lista permite navegar a una pantalla de detalle.

La ruta utilizada es:

```text
/detalle/:id
```

Ejemplo:

```text
/detalle/4
```

Desde la pantalla principal se navega utilizando:

```tsx
onClick={() => router.push(`/detalle/${tarea.id}`)}
```

La pantalla de detalle muestra:

- ID de la tarea.
- Título.
- Descripción.
- Botón para regresar al inicio.

---

## 10. Architecture

The application is divided into two main parts: an Express REST API and an Ionic React frontend.

The Express backend exposes a `GET /tareas` endpoint to retrieve the task list and a `POST /tareas` endpoint to create new tasks using JSON.

The Ionic React application consumes these endpoints using the Fetch API and stores the received information in React state.

The main screen uses `useState` to manage the task list, form fields, loading state, and error messages.

The application validates the form before sending a POST request and also handles network errors using `try/catch`.

React Router is used to navigate from the task list to a detail screen through the `/detalle/:id` route.

The detail screen receives the task identifier from the URL and displays the information associated with the selected task.

This structure separates the backend logic from the mobile user interface and allows the frontend to communicate with the API through HTTP requests.

---

## 11. Resultado

La aplicación cumple con los requisitos principales de la actividad:

- API REST con Express.
- Endpoint GET funcional.
- Endpoint POST funcional.
- Respuestas en formato JSON.
- Pantalla Ionic React para listar tareas.
- Formulario para crear tareas.
- Uso de `fetch`.
- Uso de `useState`.
- Manejo de errores de red.
- Navegación a pantalla de detalle.
- Sección `Architecture` escrita en inglés.