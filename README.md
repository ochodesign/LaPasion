# ochodesign-react

Sitio web profesional para agencia de diseño, desarrollado con React, Material UI y backend PHP/MySQL. Incluye animaciones, dashboard administrativo, formulario validado, estadísticas y experiencia de usuario moderna.

---

## Actualizaciones recientes (2025)

- Filtros del catálogo mejorados: ahora son dropdowns con checkboxes y multi-selección para categoría y género.
- Los dropdowns de filtros se cierran automáticamente al hacer scroll.
- Unificación visual de todos los filtros: mismo diseño, color y borde.
- Mejor contraste en los checkboxes de los filtros.
- Eliminado el filtro de descuento y agregado la categoría "Estampados".
- Corrección de errores de sintaxis y lógica en los filtros.
- README actualizado para reflejar los cambios recientes.

---

## Cómo iniciar este proyecto en otra PC

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/ochodesign/lapasion-react
   ```
2. **Instala las dependencias:**
   ```bash
   npm install
   ```
3. **Inicia el frontend:**
   ```bash
   npm start
   ```
4. **Configura el backend:**
   - Sube la carpeta `backend/` a tu hosting PHP (Hostinger, CPanel, etc).
   - Edita `backend/dbConfig.php` con los datos de tu base de datos MySQL.
   - Ejecuta los scripts SQL (`backend/crearTablaVisitas.sql`, etc.) para crear las tablas necesarias.

---

## ¿Qué archivos tocar si cambias la URL del backend?

- Si cambias el dominio o el hosting del backend, debes modificar las URLs en los archivos donde se hace fetch o axios a PHP:
  - `src/App.js` (líneas con `axios.get` o `fetch` apuntando al backend)
  - Componentes que consumen endpoints PHP, por ejemplo:
    - `src/components/Contacto.jsx`
    - `src/pages/AdminDashboard.jsx`
    - Otros componentes que usen llamadas a PHP (busca en el código `fetch` o `axios`)
- Reemplaza la URL base por la nueva dirección de tu backend.

---

## ¿Cómo está hecho y cuál es la función de cada parte?

### Frontend React (`/src`)
- **components/**: Componentes reutilizables (Header, Footer, Contacto, Hero, FloatingWsp, ScrollUpButton, etc.)
- **pages/**: Páginas principales (`MainPage.jsx`, `AdminDashboard.jsx`, `LoginAdmin.jsx`, etc.)
- **App.js**: Enrutador principal, gestiona rutas, animaciones y lógica global (registro de visitas, integración de AOS, renderizado condicional de botones flotantes).

### Backend PHP/MySQL (`/backend`)
- **dbConfig.php**: Configuración de la base de datos. Cambia aquí los datos si usas otro servidor.
- **crearTablaVisitas.sql**: Script para crear las tablas necesarias en MySQL.
- **Otros archivos PHP**: Endpoints para registrar visitas, gestionar mensajes, subir imágenes, etc.

### Estilos y assets
- **public/**: Imágenes, favicon, manifest, robots.txt, etc.
- **src/styles/**: Archivos CSS y Tailwind para personalización visual.

---

## Función de los principales componentes

- **Header**: Menú de navegación con animaciones y scroll suave.
- **HeroSection**: Sección principal con slider de imágenes y CTA.
- **Servicios, Proyectos, InvitacionesDigitales**: Cards informativas y visuales.
- **Contacto**: Formulario validado, integración con WhatsApp y correo.
- **AdminDashboard**: Panel de administración, gestión de mensajes y visitas.
- **FloatingWsp**: Botón flotante de WhatsApp con mensaje y notificación.
- **ScrollUpButton**: Botón flotante para volver arriba.
- **Footer**: Pie de página con links y políticas.

---

¿Dudas o necesitas adaptar algo? Solo cambia los campos y endpoints, y tendrás un sistema funcional para cualquier proyecto.

## ¿Cómo iniciar este proyecto en otra PC?

1. **Clona el repositorio:**
   ```
   git clone https://github.com/ochodesign/ochodesign-react.git
   ```
2. **Instala las dependencias:**
   ```
   npm install
   ```
3. **Inicia el proyecto:**
   ```
   npm start
   ```

4. **Configura el backend:**
   - Sube la carpeta `backend/` a tu hosting PHP (Hostinger, CPanel, etc).
   - Edita `backend/dbConfig.php` con los datos de tu base de datos MySQL.
   - Ejecuta el SQL de `backend/crearTablaVisitas.sql` para crear las tablas necesarias.

5. **Cambia las URLs si es necesario:**
   - Si cambias el dominio o el hosting del backend, modifica las URLs en los archivos donde se hace fetch o axios a PHP:
     - `src/App.js` (línea con `axios.get('https://ochodesignweb.com/backend/registrarVisita.php');`)
     - Cualquier componente que consuma endpoints PHP (ejemplo: Contacto.jsx, AdminDashboard.jsx, etc.)
   - Busca en el código las llamadas a `fetch` o `axios` y actualiza la URL base.

## ¿Cómo está hecho y para qué sirve cada parte?

- **Frontend React** (`/src`):
  - `components/`: Componentes reutilizables (Header, Footer, Contacto, Hero, FloatingWsp, ScrollUpButton, etc.)
  - `pages/`: Páginas principales (`MainPage.jsx`, `AdminDashboard.jsx`, `LoginAdmin.jsx`, etc.)
  - `App.js`: Enrutador principal, gestiona rutas, animaciones y lógica global (ejemplo: registro de visitas, integración de AOS, renderizado condicional de botones flotantes).

- **Backend PHP/MySQL** (`/backend`):
  - `dbConfig.php`: Configuración de la base de datos. Cambia aquí los datos si usas otro servidor.
  - `crearTablaVisitas.sql`: Script para crear las tablas necesarias en MySQL.
  - Otros archivos PHP: Endpoints para registrar visitas, gestionar mensajes, etc.

- **Estilos y assets**:
  - `public/`: Imágenes, favicon, manifest, robots.txt, etc.
  - `src/styles/`: Archivos CSS y Tailwind para personalización visual.

## Función de los principales componentes

- `Header`: Menú de navegación con animaciones y scroll suave.
- `HeroSection`: Sección principal con slider de imágenes y CTA.
- `Servicios`, `Proyectos`, `InvitacionesDigitales`: Cards informativas y visuales.
- `Contacto`: Formulario validado, integración con WhatsApp y correo.
- `AdminDashboard`: Panel de administración, gestión de mensajes y visitas.
- `FloatingWsp`: Botón flotante de WhatsApp con mensaje y notificación.
- `ScrollUpButton`: Botón flotante para volver arriba.
- `Footer`: Pie de página con links y políticas.

## Recomendaciones

- Si cambias el backend de dominio, revisa y actualiza las URLs en los componentes que consumen PHP.
- Prueba en mobile y desktop antes de publicar.
- Personaliza colores, textos y logos según tu marca.

---

¿Dudas o necesitas adaptar algo? Solo cambia los campos y endpoints, y tendrás un sistema funcional para cualquier proyecto!

## Funcionalidades principales

- **Frontend React**: componentes reutilizables, animaciones, scroll suave en navegación, diseño responsivo y moderno.
- **Header con animación**: menú burger en mobile, scroll suave al navegar entre secciones.
- **Hero, Beneficios, Servicios, Proyectos, Invitaciones Digitales**: secciones con cards, íconos, imágenes responsivas y efectos visuales.
- **Formulario de contacto**: validación con Formik/Yup, motivos personalizados, protección antispam, integración con WhatsApp, Instagram y correo.
- **Dashboard admin**: login seguro, gestión de mensajes, edición, eliminación, filtro y estadísticas de visitas (hoy, semana, mes, total histórico).
- **Backend PHP/MySQL**: endpoints para contacto, visitas, gestión de mensajes y estadísticas, con zona horaria Argentina.
- **Animaciones y UX**: scroll suave, hover en cards y menú, modales, galería de imágenes, footer rediseñado, mobile first.

## Estructura del proyecto

- `/src/components/` - Componentes principales (Header, Footer, Contacto, Hero, etc.)
- `/src/pages/` - Páginas (Home, AdminDashboard, LoginAdmin)
- `/backend/` - Endpoints PHP y scripts SQL
- `/public/` - Archivos estáticos

## Instalación y ejecución

1. Clona el repositorio:
   ```
   git clone https://github.com/ochodesign/ochodesign-react.git
   ```
2. Instala las dependencias:
   ```
   npm install
   ```
3. Inicia el proyecto:
   ```
   npm start
   ```

## Backend y base de datos

- Configura tu base de datos MySQL y edita `backend/dbConfig.php` con tus credenciales.
- Sube los archivos PHP a tu hosting (Hostinger, CPanel, etc).
- Usa el SQL de `backend/crearTablaVisitas.sql` para crear las tablas necesarias.

### Ejemplo de tablas
```sql
CREATE TABLE contacto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100),
  wsp VARCHAR(20),
  motivo VARCHAR(50),
  mensaje TEXT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  leido TINYINT(1) DEFAULT 0
);

CREATE TABLE visitas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATETIME NOT NULL,
  ip VARCHAR(45)
);
```

## Personalización y recomendaciones

- Cambia los campos del formulario en `Contacto.jsx` según tu proyecto.
- Personaliza colores, textos y logos en los componentes.
- Adapta el dashboard admin para mostrar los datos que necesites.
- Configura `.htaccess` para rutas SPA y acceso a endpoints PHP.
- Haz pruebas en mobile y desktop antes de publicar.

## Cambios y mejoras recientes (2025)

- Scroll suave en navegación del header.
- Footer rediseñado, modal de políticas y privacidad.
- Mejoras visuales y de UX en mobile y desktop.
- Dashboard admin con mensaje de bienvenida y sin header global.
- Dropdown de motivo en contacto se cierra al hacer scroll.
- Backend con zona horaria Argentina para registros.

---

¿Dudas o necesitas adaptar algo? Solo cambia los campos y endpoints, y tendrás un sistema funcional para cualquier proyecto!
