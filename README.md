# Workout Tracker API

API RESTful de seguimiento de entrenamientos con Node.js y Express. Gestiona usuarios, ejercicios, entrenamientos y progreso. Los datos se almacenan en memoria, por lo que se pierden al reiniciar el servidor.

## Instalación

Requisitos:

- Node.js 18 o superior
- npm

Pasos:

```bash
npm install
```

Configuración:

Crea un archivo `.env` en la raiz del proyecto con las siguientes variables:

```env
PORT=8000
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
```

La conexion a la base de datos MySQL esta declarada en `src/config/env.js` pero aun no se utiliza. La API trabaja con datos en memoria.

## Ejecucion

```bash
npm run dev
```

El script `dev` usa nodemon para reiniciar el servidor automaticamente ante cambios. Tambien puedes usar `npm start`.

Una vez iniciado, el servidor corre en `http://localhost:8000` (o el puerto definido en `PORT`). Las rutas usan el prefijo `/api/v1`.

## Endpoints

| Metodo | Ruta                    | Descripcion                              | Codigos          |
| ------ | ----------------------- | ---------------------------------------- | ---------------- |
| GET    | /api/v1/users           | Lista todos los usuarios                 | 200              |
| GET    | /api/v1/users/:id       | Obtiene un usuario por id                | 200, 404         |
| POST   | /api/v1/users           | Crea un usuario                          | 201, 400         |
| PUT    | /api/v1/users/:id       | Actualiza un usuario por id              | 200, 400, 404    |
| DELETE | /api/v1/users/:id       | Elimina un usuario por id                | 200, 404         |
| GET    | /api/v1/exercises       | Lista todos los ejercicios               | 200              |
| GET    | /api/v1/exercises/:id   | Obtiene un ejercicio por id              | 200, 404         |
| POST   | /api/v1/exercises       | Crea un ejercicio                        | 201, 400         |
| PUT    | /api/v1/exercises/:id   | Actualiza un ejercicio por id            | 200, 400, 404    |
| DELETE | /api/v1/exercises/:id   | Elimina un ejercicio por id              | 200, 404         |
| GET    | /api/v1/progress        | Lista todos los progresos                | 200              |
| GET    | /api/v1/progress/:id    | Obtiene un progreso por id               | 200, 404         |
| POST   | /api/v1/progress        | Crea un progreso                         | 201, 400         |
| PUT    | /api/v1/progress/:id    | Actualiza un progreso por id             | 200, 400, 404    |
| DELETE | /api/v1/progress/:id    | Elimina un progreso por id               | 200, 404         |
| GET    | /api/v1/workouts        | Lista todos los entrenamientos           | 200              |
| GET    | /api/v1/workouts/:id    | Obtiene un entrenamiento por id          | 200, 404         |
| POST   | /api/v1/workouts        | Crea un entrenamiento                    | 201, 400         |
| PUT    | /api/v1/workouts/:id    | Actualiza un entrenamiento por id        | 200, 400, 404    |
| DELETE | /api/v1/workouts/:id    | Elimina un entrenamiento por id          | 200, 404         |

## Ejemplos de peticiones y respuestas

### Usuarios

#### GET /api/v1/users

Respuesta:

```json
[
  {
    "id": "1",
    "name": "Sofía Martínez",
    "email": "sofia.martinez@gmail.com",
    "role": "admin",
    "createdAt": "2025-09-12T12:00:00Z"
  },
  {
    "id": "2",
    "name": "Andrés Ramírez",
    "email": "andres.ramirez@hotmail.com",
    "role": "user",
    "createdAt": "2025-09-15T10:30:00Z"
  }
]
```

#### GET /api/v1/users/1

Respuesta:

```json
{
  "id": "1",
  "name": "Sofía Martínez",
  "email": "sofia.martinez@gmail.com",
  "role": "admin",
  "createdAt": "2025-09-12T12:00:00Z"
}
```

#### POST /api/v1/users

Cuerpo de la peticion:

```json
{
  "name": "Valentina Rojas",
  "email": "valentina.rojas@gmail.com",
  "role": "user"
}
```

Respuesta (201):

```json
{
  "id": "1784793600000",
  "name": "Valentina Rojas",
  "email": "valentina.rojas@gmail.com",
  "role": "user",
  "createdAt": "2026-09-22T20:15:00.000Z"
}
```

#### PUT /api/v1/users/1

Cuerpo de la peticion:

```json
{
  "name": "Sofía Martínez",
  "email": "sofia.martinez.nueva@gmail.com",
  "role": "admin"
}
```

Respuesta (200):

```json
{
  "id": "1",
  "name": "Sofía Martínez",
  "email": "sofia.martinez.nueva@gmail.com",
  "role": "admin",
  "createdAt": "2025-09-12T12:00:00Z"
}
```

#### DELETE /api/v1/users/1

Respuesta (200):

```json
{
  "deleted": "1"
}
```

Respuesta de error cuando el id no existe:

```json
{
  "error": "Usuario no encontrado"
}
```

### Ejercicios

#### GET /api/v1/exercises

Respuesta:

```json
[
  {
    "id": "1",
    "name": "Press de banca",
    "description": "Ejercicio compuesto que trabaja pectorales, hombros y tríceps acostado sobre un banco.",
    "weight": "60",
    "reps": "10",
    "category": "fuerza",
    "createdAt": "2025-09-12T12:00:00Z"
  },
  {
    "id": "2",
    "name": "Sentadilla",
    "description": "Ejercicio compuesto que fortalece cuádriceps, glúteos y zona lumbar.",
    "weight": "80",
    "reps": "12",
    "category": "fuerza",
    "createdAt": "2025-09-13T08:00:00Z"
  }
]
```

#### GET /api/v1/exercises/1

Respuesta:

```json
{
  "id": "1",
  "name": "Press de banca",
  "description": "Ejercicio compuesto que trabaja pectorales, hombros y tríceps acostado sobre un banco.",
  "weight": "60",
  "reps": "10",
  "category": "fuerza",
  "createdAt": "2025-09-12T12:00:00Z"
}
```

#### POST /api/v1/exercises

Cuerpo de la peticion:

```json
{
  "name": "Curl de biceps",
  "description": "Flexion de codo con mancuernas para trabajar el biceps.",
  "weight": "12",
  "reps": "15",
  "category": "fuerza"
}
```

Respuesta (201):

```json
{
  "id": "1784793600001",
  "name": "Curl de biceps",
  "description": "Flexion de codo con mancuernas para trabajar el biceps.",
  "weight": "12",
  "reps": "15",
  "category": "fuerza",
  "createdAt": "2026-09-22T20:15:01.000Z"
}
```

#### PUT /api/v1/exercises/1

Cuerpo de la peticion:

```json
{
  "name": "Press de banca",
  "description": "Ejercicio compuesto que trabaja pectorales, hombros y tríceps.",
  "weight": "65",
  "reps": "8",
  "category": "fuerza"
}
```

Respuesta (200):

```json
{
  "id": "1",
  "name": "Press de banca",
  "description": "Ejercicio compuesto que trabaja pectorales, hombros y tríceps.",
  "weight": "65",
  "reps": "8",
  "category": "fuerza",
  "createdAt": "2025-09-12T12:00:00Z"
}
```

#### DELETE /api/v1/exercises/1

Respuesta (200):

```json
{
  "deleted": "1"
}
```

Respuesta de error cuando el id no existe:

```json
{
  "error": "Ejercicio no encontrado"
}
```

### Progreso

#### GET /api/v1/progress

Respuesta:

```json
[
  {
    "id": "1",
    "idExercise": "1",
    "weight": "60",
    "reps": "10",
    "createdAt": "2025-09-12T12:00:00Z"
  },
  {
    "id": "2",
    "idExercise": "2",
    "weight": "80",
    "reps": "12",
    "createdAt": "2025-09-14T18:45:00Z"
  }
]
```

#### GET /api/v1/progress/1

Respuesta:

```json
{
  "id": "1",
  "idExercise": "1",
  "weight": "60",
  "reps": "10",
  "createdAt": "2025-09-12T12:00:00Z"
}
```

#### POST /api/v1/progress

Cuerpo de la peticion:

```json
{
  "idExercise": "1",
  "weight": "65",
  "reps": "8"
}
```

Respuesta (201):

```json
{
  "id": "1784793600002",
  "idExercise": "1",
  "weight": "65",
  "reps": "8",
  "createdAt": "2026-09-22T20:15:02.000Z"
}
```

#### PUT /api/v1/progress/1

Cuerpo de la peticion:

```json
{
  "idExercise": "1",
  "weight": "70",
  "reps": "6"
}
```

Respuesta (200):

```json
{
  "id": "1",
  "idExercise": "1",
  "weight": "70",
  "reps": "6",
  "createdAt": "2025-09-12T12:00:00Z"
}
```

#### DELETE /api/v1/progress/1

Respuesta (200):

```json
{
  "deleted": "1"
}
```

Respuesta de error cuando el id no existe:

```json
{
  "error": "Progreso no encontrado"
}
```

### Entrenamientos

#### GET /api/v1/workouts

Respuesta:

```json
[
  {
    "id": "1",
    "title": "Fuerza básica",
    "description": "Sesión de fuerza con press de banca y sentadilla, 3 series de 8 a 12 repeticiones.",
    "exercises": [1, 2],
    "createdAt": "2026-01-30T18:00:00Z"
  },
  {
    "id": "2",
    "title": "Cardio HIIT",
    "description": "Intervalos de alta intensidad en cinta, 8 rondas de 1 minuto con 30 segundos de descanso.",
    "exercises": [1, 2],
    "createdAt": "2026-02-02T07:30:00Z"
  }
]
```

#### GET /api/v1/workouts/1

Respuesta:

```json
{
  "id": "1",
  "title": "Fuerza básica",
  "description": "Sesión de fuerza con press de banca y sentadilla, 3 series de 8 a 12 repeticiones.",
  "exercises": [1, 2],
  "createdAt": "2026-01-30T18:00:00Z"
}
```

#### POST /api/v1/workouts

Cuerpo de la peticion:

```json
{
  "title": "Hombro completo",
  "description": "Deltoides anterior, lateral y posterior en 3 series de 12 repeticiones.",
  "exercises": [1, 2]
}
```

Respuesta (201):

```json
{
  "id": "1784793600003",
  "title": "Hombro completo",
  "description": "Deltoides anterior, lateral y posterior en 3 series de 12 repeticiones.",
  "exercises": [1, 2],
  "createdAt": "2026-09-22T20:15:03.000Z"
}
```

#### PUT /api/v1/workouts/1

Cuerpo de la peticion:

```json
{
  "title": "Fuerza básica",
  "description": "Sesión de fuerza con press de banca, sentadilla y dominadas.",
  "exercises": [1, 2, 3]
}
```

Respuesta (200):

```json
{
  "id": "1",
  "title": "Fuerza básica",
  "description": "Sesión de fuerza con press de banca, sentadilla y dominadas.",
  "exercises": [1, 2, 3],
  "createdAt": "2026-01-30T18:00:00Z"
}
```

#### DELETE /api/v1/workouts/1

Respuesta (200):

```json
{
  "deleted": "1"
}
```

Respuesta de error cuando el id no existe:

```json
{
  "error": "Entrenamiento no encontrado"
}
```

### Campo obligatorio faltante

Cualquier POST o PUT que omita un campo requerido responde con estado 400, por ejemplo:

```json
{
  "error": "Name, description y category son requeridos"
}
```

## Codigos de estado

| Codigo | Nombre     | Uso                                                     |
| ------ | ---------- | ------------------------------------------------------- |
| 200    | OK         | GET, PUT y DELETE exitosos                              |
| 201    | Created    | POST exitoso                                            |
| 400    | Bad Request| Falta un campo obligatorio en el cuerpo de la peticion  |
| 404    | Not Found  | El recurso con el id indicado no existe                 |

## Peticiones POST de prueba

El archivo `peticiones-post.md` contiene 3 peticiones POST en crudo por cada endpoint, listas para copiar y pegar en Bruno.