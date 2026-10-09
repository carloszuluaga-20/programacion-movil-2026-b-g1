# Mini App de Tareas - Semana 10

Actividad opcional de Programación Móvil correspondiente a la Semana 10.

La aplicación integra un frontend desarrollado con Ionic React y un backend desarrollado con Express.

## Objetivo

Integrar frontend y backend en una mini aplicación capaz de listar tareas, crear nuevas tareas, navegar al detalle de cada una y manejar errores básicos de red.

## Tecnologías

- Ionic React
- React
- TypeScript
- Vite
- Express
- Node.js
- Fetch API
- React Router

## Estructura del proyecto

```text
mini-app-tareas
│
├── api
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
└── app
    ├── src
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── package-lock.json
```

## Backend

El backend fue desarrollado con Express.

Se ejecuta en:

```text
http://localhost:3000
```

### Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/tasks` | Lista todas las tareas |
| GET | `/tasks/:id` | Obtiene una tarea por ID |
| POST | `/tasks` | Crea una nueva tarea |

## Frontend

El frontend fue desarrollado utilizando Ionic React.

Se ejecuta en:

```text
http://localhost:5173
```

La aplicación permite:

- Listar tareas obtenidas desde el backend.
- Crear nuevas tareas mediante un formulario.
- Navegar al detalle de una tarea.
- Mostrar mensajes de error cuando ocurre un problema de red o faltan datos.

## Ejemplo de tarea

```json
{
  "id": 1,
  "titulo": "Estudiar Ionic",
  "descripcion": "Repasar componentes y navegación"
}
```

## Funcionamiento

Al iniciar la aplicación se cargan las tareas desde el backend utilizando `fetch`.

El usuario puede ingresar un título y una descripción para crear una nueva tarea.

Cuando se crea una tarea, el frontend realiza una petición `POST` al backend y luego actualiza la lista.

Al seleccionar una tarea, la aplicación navega a una pantalla de detalle utilizando React Router.

## Manejo de errores

La aplicación incluye manejo básico de errores.

Si el backend no está disponible, se muestra un mensaje indicando que ocurrió un error de red.

También se valida que el título y la descripción no estén vacíos antes de crear una tarea.

## Ejecución

### Backend

Entrar a la carpeta:

```text
api
```

Ejecutar:

```bash
npm install
node index.js
```

### Frontend

Entrar a la carpeta:

```text
app
```

Ejecutar:

```bash
npm install
npm run dev
```

## Resultado

Se logró integrar correctamente Ionic React con Express.

La aplicación permite listar, crear y consultar el detalle de tareas, además de manejar errores básicos.

## Autor

Carlos Zuluaga

Programación Móvil  
Semana 10