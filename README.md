# Service JJ — Frontend

Sitio web de **Service JJ**: ventas, servicio técnico, climatización y gestión de pedidos de taller. SPA construida con React y Vite, con autenticación Firebase y comunicación con el backend propio para pedidos y seguimiento.

**Repositorio:** [github.com/jochurru/servicejj2.0](https://github.com/jochurru/servicejj2.0)

---

## Características

- **Landing y catálogos:** Home, Ventas, Servicio Técnico y Climatización con contenido dinámico desde `src/data/`.
- **Técnico online:** formulario en varios pasos para ingresar equipos al taller (fotos, datos de contacto).
- **Seguimiento público:** consulta de estado por ticket (`SJ-XXXX`) sin login, con soporte QR (`html5-qrcode`).
- **Mis pedidos:** usuarios autenticados pueden reclamar pedidos vinculados a su email.
- **Panel admin:** wizard protegido (`/admin-wizard`) para listar, crear, editar y eliminar pedidos.
- **Auth:** Firebase Authentication (Google u otros proveedores configurados en la consola).
- **UI:** Tailwind CSS 4, Framer Motion, diseño blanco/negro con tipografía Inter y Newtown.

---

## Stack tecnológico

| Área        | Tecnología                          |
|------------|--------------------------------------|
| Framework  | React 19                             |
| Build      | Vite 8                               |
| Estilos    | Tailwind CSS 4, PostCSS              |
| Routing    | React Router 7                       |
| HTTP       | `fetch` vía `src/services/api.js`    |
| Auth / DB  | Firebase (Auth + Firestore cliente)  |
| Animación  | Framer Motion                        |
| Alertas    | SweetAlert2                          |

---

## Requisitos previos

- [Node.js](https://nodejs.org/) 18+ (recomendado 20 LTS)
- Backend de Service JJ en ejecución (ver [servicejj-backend](../servicejj-backend/))
- Proyecto Firebase con Authentication y Firestore habilitados

---

## Instalación

```bash
git clone https://github.com/jochurru/servicejj2.0.git
cd servicejj2.0
npm install
```

### Variables de entorno

Creá un archivo `.env` en la raíz del proyecto (no se sube a Git):

```env
# API del backend
VITE_API_URL=http://localhost:5000/api
VITE_SERVICE_JJ_API_KEY=tu_misma_clave_que_API_KEY_SECRET_del_backend

# Firebase (consola de Firebase → Configuración del proyecto)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# Admin: emails separados por coma (opcional si usás rol en Firestore)
VITE_ADMIN_EMAILS=admin@ejemplo.com
```

`VITE_SERVICE_JJ_API_KEY` debe coincidir con `API_KEY_SECRET` del backend. Las variables `VITE_*` solo están disponibles en el cliente; no incluyas secretos de servidor aquí.

### Desarrollo

```bash
npm run dev
```

La app corre por defecto en [http://localhost:5173](http://localhost:5173).

### Producción

```bash
npm run build
npm run preview
```

El build queda en `dist/`. Configurá `VITE_API_URL` y el resto de variables para el dominio de producción antes de compilar.

---

## Scripts disponibles

| Comando           | Descripción                    |
|------------------|--------------------------------|
| `npm run dev`    | Servidor de desarrollo Vite    |
| `npm run build`  | Build de producción            |
| `npm run preview`| Vista previa del build         |
| `npm run lint`   | ESLint sobre el proyecto       |

---

## Estructura del proyecto

```
src/
├── components/
│   ├── common/       # Login, formularios, QR, rutas admin
│   ├── layout/       # Navbar, Footer
│   └── ui/           # FadeIn, PageHero, ProductCard, motion
├── context/          # AuthProvider
├── data/             # Contenido estático (productos, servicios)
├── hooks/            # useAuth, useAdmin
├── pages/            # Vistas por ruta
├── services/
│   ├── api.js        # Cliente REST hacia el backend
│   └── firebaseConfig.js
├── App.jsx           # Rutas principales
└── index.css         # Design system y fuentes
```

---

## Rutas

| Ruta                    | Descripción                                      |
|-------------------------|--------------------------------------------------|
| `/`                     | Inicio                                           |
| `/ventas`               | Catálogo de ventas                               |
| `/servicio-tecnico`     | Servicios de reparación                          |
| `/climatizacion`        | Equipos de climatización                         |
| `/tecnico-online`       | Alta de pedido (formulario)                      |
| `/seguimiento/:idCorto` | Estado público del ticket                        |
| `/mis-pedidos`          | Pedidos del usuario logueado                     |
| `/login`                | Inicio de sesión                                 |
| `/admin-wizard`         | Panel admin (requiere permisos)                  |
| `/terminos`, `/privacidad` | Páginas legales                              |

---

## Integración con el backend

El módulo `src/services/api.js` expone `serviceApi`:

| Método                 | Endpoint backend                         | Auth API key |
|------------------------|------------------------------------------|--------------|
| `getPedidos`           | `GET /api/pedidos`                       | Sí           |
| `createPedido`         | `POST /api/pedidos` (multipart)          | Sí           |
| `updatePedido`         | `PUT /api/pedidos/:id`                   | Sí           |
| `deletePedido`         | `DELETE /api/pedidos/:id`                | Sí           |
| `buscarPedido`         | `GET /api/pedidos/ticket/:idCorto`       | Sí           |
| `consultarSeguimiento` | `GET /api/pedidos/seguimiento/:idCorto`  | No           |
| `reclamarPedidos`      | `POST /api/pedidos/reclamar`             | No           |

Los tickets se normalizan al formato `SJ-XXXX` (mayúsculas). El header de autenticación admin es `x-api-key`.

---

## Acceso de administrador

Un usuario es admin si cumple **alguna** de estas condiciones:

1. Su email está en `VITE_ADMIN_EMAILS` (lista separada por comas).
2. En Firestore, documento `usuarios/{uid}` con campo `rol: 'admin'`.

En **modo desarrollo** (`npm run dev`), cualquier usuario autenticado puede acceder al wizard admin para facilitar pruebas locales.

La ruta `/admin-wizard` está envuelta en `AdminRoute`, que redirige si no hay permisos.

---

## Fuentes y assets

- Fuente display **Newtown** en `public/fonts/` (referenciada en `index.css`).
- Imágenes de productos y secciones en `public/` según cada página.

---

## Enlaces relacionados

- **Backend API:** [servicejj2.0backend](https://github.com/jochurru/servicejj2.0backend)
- Documentación Vite: [vite.dev](https://vite.dev/)
- Firebase Web: [firebase.google.com/docs/web](https://firebase.google.com/docs/web/setup)
