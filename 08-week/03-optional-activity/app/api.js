const API_URL = 'http://localhost:3000/tareas';

export async function listarTareas() {
  try {
    const respuesta = await fetch(API_URL);

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

export async function crearTarea(titulo) {
  try {
    const respuesta = await fetch(API_URL, {
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