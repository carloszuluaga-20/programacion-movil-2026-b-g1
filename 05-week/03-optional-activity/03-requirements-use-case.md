# 3. Requerimientos y caso de uso

## Requerimientos funcionales

### RF-01 - Consultar horario

La aplicación debe permitir al estudiante visualizar su horario de clases.

### RF-02 - Consultar materias

La aplicación debe permitir al estudiante consultar las materias registradas.

### RF-03 - Ver información de una materia

La aplicación debe permitir seleccionar una materia y visualizar su información principal.

### RF-04 - Registrar notas

La aplicación debe permitir registrar una nota asociada a una materia.

### RF-05 - Consultar notas

La aplicación debe permitir visualizar las notas registradas de cada materia.

### RF-06 - Navegar entre pantallas

La aplicación debe permitir al usuario navegar entre las pantallas de inicio, materias y notas.

---

## Requerimientos no funcionales

### RNF-01 - Usabilidad

La aplicación debe tener una interfaz sencilla y fácil de entender para el estudiante.

### RNF-02 - Rendimiento

Las pantallas principales deben cargar la información de manera rápida.

### RNF-03 - Compatibilidad

La aplicación debe poder ejecutarse en dispositivos móviles compatibles con la tecnología seleccionada para el proyecto.

### RNF-04 - Persistencia

La información registrada por el estudiante debe mantenerse almacenada para poder consultarse posteriormente.

### RNF-05 - Organización visual

La información del horario, materias y notas debe mostrarse de forma clara y ordenada.

---

# Caso de uso

## CU-01 - Registrar nota

### Actor

Estudiante

### Descripción

El estudiante registra una nota obtenida en una materia para llevar un control de su rendimiento académico.

### Precondiciones

- La aplicación debe estar abierta.
- La materia debe estar registrada.
- El estudiante debe encontrarse en la sección de notas.

### Flujo principal

1. El estudiante ingresa a la sección de notas.
2. La aplicación muestra las materias disponibles.
3. El estudiante selecciona una materia.
4. El estudiante ingresa la nota obtenida.
5. El estudiante confirma el registro.
6. La aplicación guarda la nota.
7. La aplicación muestra la nota registrada.

### Flujo alternativo

Si el estudiante ingresa un valor incorrecto o deja el campo vacío, la aplicación debe mostrar un mensaje indicando que debe ingresar una nota válida.

### Postcondiciones

- La nota queda registrada.
- La nota queda relacionada con la materia seleccionada.
- El estudiante puede consultar posteriormente la nota guardada.