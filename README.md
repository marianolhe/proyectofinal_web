# Mi Colección Personal — Tracker de Viajes

App full-stack para registrar y gestionar viajes personales.
Construida con React + Vite en el frontend y Express + PostgreSQL en el backend.

## Tema
Viajes y destinos visitados o pendientes.

## Cómo correr el proyecto

### Frontend
cd frontend
npm install
npm run dev

### Backend
cd backend
npm install
npm run dev

## Endpoints disponibles
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/items | Obtiene todos los items activos |
| POST | /api/items | Crea un item nuevo |
| PUT | /api/items/:id | Actualiza un item |
| DELETE | /api/items/:id | Archiva un item |
| POST | /api/items/:id/registro | Registra actividad diaria |

## Paleta de colores

### Tema claro

| Variable | Hex | Nombre |
|----------|-----|--------|
| `--color-fondo` | `#fdf0f0` | Rosa pálido |
| `--color-superficie` | `#ffffff` | Blanco |
| `--color-texto` | `#3a2a2a` | Marrón oscuro cálido |
| `--color-texto-secundario` | `#a3a380` | Dry-sage |
| `--color-borde` | `#e8d8d8` | Rosa suave |
| `--color-primario` | `#a3a380` | Dry-sage |

### Tema oscuro

| Variable | Hex | Nombre |
|----------|-----|--------|
| `--color-fondo` | `#2e2424` | Rosa oscuro profundo |
| `--color-superficie` | `#3d2f2f` | Marrón rojizo oscuro |
| `--color-texto` | `#f5e8e8` | Rosa muy pálido |
| `--color-texto-secundario` | `#d6ce93` | Vanilla-custard |
| `--color-borde` | `#5a3f3f` | Marrón cálido oscuro |
| `--color-primario` | `#a3a380` | Dry-sage |

## Mi gráfica original

La gráfica que propuse muestra la puntuación promedio por categoría de destino. Cada barra representa un tipo de viaje (ciudad, playa, montaña, pueblo, aventura) y su altura indica el promedio de puntuaciones que le di a esos viajes.

La elegí porque para un tracker de viajes personales tiene mucho sentido saber qué tipo de destino disfrutas más, no solo cuántos tienes de cada uno. Si tengo varios viajes de playa con puntuaciones altas y varios de ciudad con puntuaciones bajas, la gráfica me lo dice de un vistazo.

## Mis 3 decisiones técnicas

**1. Estructura del reducer:** Metí los filtros y la lista de viajes en el mismo estado del reducer porque están muy relacionados. Si los hubiera separado con useState tendría que estar sincronizando varios estados cada vez que el usuario filtra algo. Así todo vive junto y cualquier cambio pasa por una sola función pura.

**2. Acción más difícil — REGISTRAR_ACTIVIDAD:** Fue la más complicada porque el registro va dentro de un viaje que ya está dentro de la lista. Tuve que hacer un map para encontrar el viaje correcto y dentro de ese mismo map agregar el registro nuevo al array de historial sin modificar el objeto original, usando spread para crear copias en cada nivel.

**3. Gráfica más compleja — Puntuación promedio:** Esta gráfica transforma los datos en dos pasos: primero agrupa los viajes por categoría, luego filtra los que no tienen puntuación y calcula el promedio con reduce. Si una categoría no tiene ningún viaje puntuado no aparece en la gráfica para que no confunda con una barra en cero.

## Análisis de optimización con React Profiler

**ANTES de useMemo** — mientras escribía en el buscador la app hizo 378 commits. O sea, cada letra que escribía hacía que React recalculara todo y redibujara las 3 gráficas aunque no hubiera cambiado nada relevante.
<img width="1600" height="1023" alt="image" src="https://github.com/user-attachments/assets/3a6a993b-d47c-4d7b-adae-5243fea49f84" />



**DESPUÉS de useMemo** — los commits bajaron a 234. Ahora React se da cuenta cuando la lista filtrada no cambió y simplemente no redibuja las gráficas. `useMemo` guarda el resultado anterior y solo lo vuelve a calcular si cambia algo en lista, filtroCategoria, filtroEstado o busqueda.
<img width="1223" height="649" alt="image" src="https://github.com/user-attachments/assets/34e99ebc-54d4-4bad-ac65-471435cb78ec" />


## Mis primeros Items
<img width="1078" height="250" alt="image" src="https://github.com/user-attachments/assets/74d8cedc-520b-4ac6-a5b7-8109c95670f2" />

