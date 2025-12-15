# 🛍️ Mini Catálogo de Productos con Favoritos

Sistema completo de catálogo de productos con sistema de favoritos, carrito de compras y panel de administración. Desarrollado con React + Vite en el frontend y Laravel en el backend.

## 📋 Características

### 🎯 Funcionalidades Principales

- **Catálogo de Productos**: Visualización de productos con imágenes, descripciones y precios
- **Sistema de Favoritos**: Marcar y gestionar productos favoritos
- **Carrito de Compras**: Agregar productos, modificar cantidades y ver totales
- **Comentarios**: Sistema de comentarios por producto
- **API Externa**: Generador de imágenes aleatorias de perros
- **Búsqueda**: Filtrado de productos en tiempo real
- **Autenticación**: Sistema completo de login y registro

### 👨‍💼 Panel de Administración

- **Gestión de Precios**: Cambiar precios de productos
- **Eliminación de Productos**: Eliminar productos del catálogo
- **Permisos por Rol**: Funcionalidades exclusivas para administradores

### 🎨 Interfaz de Usuario

- **Diseño Moderno**: Interfaz limpia y profesional con gradientes
- **Menú Lateral Colapsable**: Navegación intuitiva con opción de ocultar
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Animaciones**: Transiciones suaves y efectos hover

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18**: Biblioteca de JavaScript para construir interfaces
- **Vite**: Herramienta de compilación rápida
- **React Router DOM**: Navegación entre páginas
- **Lucide React**: Iconos modernos
- **LocalStorage**: Persistencia del carrito

### Backend
- **Laravel 12**: Framework PHP
- **MySQL**: Base de datos
- **Laravel Sanctum**: Autenticación API
- **Guzzle HTTP**: Cliente HTTP para APIs externas

## 📦 Instalación

### Requisitos Previos

- Node.js (v16 o superior)
- PHP 8.2 o superior
- Composer
- MySQL

### Clonar el Repositorio

```bash
git clone https://github.com/mateoescudero10-svg/Mini-cat-logo-de-productos-con-favoritos.git
cd Mini-cat-logo-de-productos-con-favoritos
```

### Configuración del Frontend

```bash
cd mini-catalogo-favoritos
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### Configuración del Backend

```bash
cd mini-catalogo-favoritos-api
composer install
```

Crea el archivo `.env` copiando `.env.example`:

```bash
cp .env.example .env
```

Configura tu base de datos en el archivo `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mini_catalogo
DB_USERNAME=root
DB_PASSWORD=
```

Genera la clave de la aplicación:

```bash
php artisan key:generate
```

Ejecuta las migraciones y seeders:

```bash
php artisan migrate:fresh --seed
```

Inicia el servidor:

```bash
php artisan serve
```

El backend estará disponible en `http://localhost:8000`

## 👤 Credenciales de Acceso

### Administrador
- **Email**: `mateo@ejemplo.com`
- **Contraseña**: `1234`

### Usuario Regular
- **Email**: `user@example.com`
- **Contraseña**: `password`

## 📁 Estructura del Proyecto

```
Mini-cat-logo-de-productos-con-favoritos/
│
├── mini-catalogo-favoritos/          # Frontend React
│   ├── src/
│   │   ├── api.js                    # Configuración de API
│   │   ├── App.jsx                   # Componente principal
│   │   ├── AuthContext.jsx           # Contexto de autenticación
│   │   ├── CartContext.jsx           # Contexto del carrito
│   │   ├── menu.jsx                  # Menú lateral
│   │   ├── products.jsx              # Catálogo de productos
│   │   ├── cart.jsx                  # Carrito de compras
│   │   ├── login.jsx                 # Página de login
│   │   ├── registrar.jsx             # Página de registro
│   │   ├── inicio.jsx                # Página de inicio
│   │   └── api_externa.jsx           # Integración API externa
│   └── package.json
│
└── mini-catalogo-favoritos-api/      # Backend Laravel
    ├── app/
    │   ├── Http/Controllers/Api/
    │   │   ├── AuthController.php
    │   │   ├── ProductController.php
    │   │   ├── FavoriteController.php
    │   │   ├── CommentController.php
    │   │   └── ExternalApiController.php
    │   └── Models/
    │       ├── User.php
    │       ├── Product.php
    │       ├── Favorite.php
    │       └── Comment.php
    ├── database/
    │   ├── migrations/
    │   └── seeders/
    └── routes/
        └── api.php
```

## 🚀 Uso

### Navegación del Usuario

1. **Registro/Login**: Crea una cuenta o inicia sesión
2. **Explorar Productos**: Navega por el catálogo
3. **Buscar**: Usa la barra de búsqueda para filtrar productos
4. **Favoritos**: Marca productos como favoritos con el corazón ❤️
5. **Carrito**: Agrega productos al carrito 🛒
6. **Comentarios**: Deja comentarios en los productos
7. **API Externa**: Genera imágenes aleatorias de perros 🐕

### Funciones de Administrador

- **Cambiar Precios**: Click en el botón "💲 Precio"
- **Eliminar Productos**: Click en el botón "🗑️ Eliminar"

## 📊 Productos Incluidos

### Electrónicos
- Laptop Gaming ($1,200.00)
- Smartphone Pro ($899.99)
- Auriculares Bluetooth ($199.99)

### Productos para Mascotas
- Cama para Perro Grande ($89.99)
- Comedero Automático ($129.99)
- Juguete Interactivo Gato ($45.99)
- Correa Retráctil Premium ($34.99)
- Arena para Gato ($24.99)
- Transportadora de Viaje ($79.99)

## 🔒 Seguridad

- Autenticación con Laravel Sanctum
- Protección de rutas con middleware
- Validación de datos en frontend y backend
- Tokens de acceso seguros

## 🌐 API Endpoints

### Autenticación
- `POST /api/register` - Registro de usuario
- `POST /api/login` - Inicio de sesión
- `POST /api/logout` - Cerrar sesión

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products/{id}` - Ver producto
- `POST /api/products` - Crear producto (Admin)
- `PUT /api/products/{id}` - Actualizar producto (Admin)
- `DELETE /api/products/{id}` - Eliminar producto (Admin)

### Favoritos
- `GET /api/favorites` - Listar favoritos
- `POST /api/favorites` - Agregar favorito
- `DELETE /api/favorites/{id}` - Eliminar favorito

### Comentarios
- `GET /api/comments/{product_id}` - Listar comentarios
- `POST /api/comments` - Crear comentario

### API Externa
- `GET /api/external/dog-image` - Obtener imagen de perro

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu función (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**Mateo Escudero**
- GitHub: [@mateoescudero10-svg](https://github.com/mateoescudero10-svg)
- GitHun 
## 📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

---

⭐ Si te gusta este proyecto, no olvides darle una estrella en GitHub!
