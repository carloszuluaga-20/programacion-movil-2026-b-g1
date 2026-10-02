# 4. Modelo de datos, wireframes y navegación

## Modelo de datos

Para la aplicación se definen las siguientes entidades principales:

### Estudiante

Representa al usuario principal de la aplicación.

**Atributos:**

- id
- nombre
- correo

### Materia

Representa una asignatura registrada por el estudiante.

**Atributos:**

- id
- nombre
- profesor
- aula
- horario

### Nota

Representa una calificación obtenida por el estudiante en una materia.

**Atributos:**

- id
- materiaId
- descripcion
- valor
- fecha

## Relaciones

- Un estudiante puede tener varias materias.
- Una materia puede tener varias notas.
- Cada nota pertenece a una materia.

Representación simple:

```text
Estudiante
   |
   | 1
   |
   | N
Materia
   |
   | 1
   |
   | N
Nota

---

## Wireframes

Los wireframes representan las pantallas principales de la aplicación.

### Pantalla de inicio

```text
+----------------------------------+
|       HORARIO ESTUDIANTIL        |
+----------------------------------+
|                                  |
|       Clases de hoy              |
|                                  |
|  8:00 AM - Programación Móvil    |
|  10:00 AM - Sistemas Operativos  |
|                                  |
+----------------------------------+
|                                  |
|   [ Materias ]   [ Notas ]       |
|                                  |
+----------------------------------+

---

### Pantalla de materias


+----------------------------------+
|            MATERIAS              |
+----------------------------------+
|                                  |
| Programación Móvil               |
| Profesor: Juan                   |
| Horario: 8:00 AM                 |
|                                  |
| Sistemas Operativos              |
| Profesor: Carlos                 |
| Horario: 10:00 AM                |
|                                  |
+----------------------------------+
|            [ Volver ]            |
+----------------------------------+

---

### Pantalla de notas

+----------------------------------+
|              NOTAS               |
+----------------------------------+
|                                  |
| Materia: Programación Móvil      |
|                                  |
| Parcial 1: 4.0                   |
| Taller: 4.5                      |
|                                  |
|        [ Registrar nota ]        |
|                                  |
+----------------------------------+
|            [ Volver ]            |
+----------------------------------+

---

### Mapa de navegación


                 +------------+
                 |   Inicio   |
                 +------------+
                  /          \
                 /            \
                v              v
        +-------------+   +-------------+
        |  Materias   |   |    Notas    |
        +-------------+   +-------------+
              |                 |
              |                 |
              +-------> Inicio <+