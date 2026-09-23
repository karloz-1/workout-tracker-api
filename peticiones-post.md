# Peticiones POST de prueba

Base URL: `http://localhost:8000/api/v1`

Copia el JSON y pégalo en el cuerpo (`Body`) de la petición POST en Bruno.

---

## POST /api/v1/users/

### Petición 1

```json
{
  "name": "Valentina Rojas",
  "email": "valentina.rojas@gmail.com",
  "role": "user"
}
```

### Petición 2

```json
{
  "name": "Manuel Torres",
  "email": "manuel.torres@outlook.com",
  "role": "admin"
}
```

### Petición 3

```json
{
  "name": "Lucía Fernández",
  "email": "lucia.fernandez@yahoo.com",
  "role": "user"
}
```

---

## POST /api/v1/exercises/

### Petición 1

```json
{
  "name": "Curl de bíceps",
  "description": "Flexión de codo con mancuernas para trabajar el bíceps.",
  "weight": "12",
  "reps": "15",
  "category": "fuerza"
}
```

### Petición 2

```json
{
  "name": "Plancha",
  "description": "Ejercicio isométrico que activa el abdomen y los músculos estabilizadores.",
  "weight": "0",
  "reps": "60",
  "category": "flexibilidad"
}
```

### Petición 3

```json
{
  "name": "Correr en cinta",
  "description": "Cardio de intensidad moderada durante 20 minutos.",
  "weight": "0",
  "reps": "1",
  "category": "cardio"
}
```

---

## POST /api/v1/progress/

### Petición 1

```json
{
  "idExercise": "1",
  "weight": "65",
  "reps": "8"
}
```

### Petición 2

```json
{
  "idExercise": "2",
  "weight": "85",
  "reps": "10"
}
```

### Petición 3

```json
{
  "idExercise": "1",
  "weight": "60",
  "reps": "12"
}
```

---

## POST /api/v1/workouts/

### Petición 1

```json
{
  "title": "Hombro completo",
  "description": "Deltoides anterior, lateral y posterior en 3 series de 12 repeticiones.",
  "exercises": [1, 2]
}
```

### Petición 2

```json
{
  "title": "Pierna y glúteo",
  "description": "Sentadillas, zancadas y peso muerto rumano.",
  "exercises": [2]
}
```

### Petición 3

```json
{
  "title": "Full body",
  "description": "Rutina de todo el cuerpo en circuito de 4 ejercicios.",
  "exercises": [1, 2, 3]
}
```