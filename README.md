# 📦 Sistema de Gestión de Pedidos (Fullstack Senior)

![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Architecture](https://img.shields.io/badge/Architecture-Clean%20%2B%20CQRS-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

> **Solución Integral al Reto Técnico.**
> Una aplicación empresarial robusta diseñada bajo estrictos estándares de **Arquitectura Limpia**, **Seguridad (JWT)**, **Resiliencia** y **UX Moderna**.

## 📸 Galería del Proyecto

### 🎨 Frontend (UI/UX)
Diseño responsivo y amigable desarrollado con React y Tailwind CSS.
Login
![alt text](image.png)

Validaciones Login
![alt text](image-1.png)

Ingreso login 
![alt text](image-2.png)

Modal Inicio de Sesion exitoso 
![alt text](image-3.png)

Gestion de pedidos Modo Claro 
![alt text](image-26.png)

Gestion de pedidos Modo Dark 
![alt text](image-4.png)
 
Crear Nuevo Pedido modo oscuro  
![alt text](image-16.png)

Crear Nuevo pedido modo oscuro con validaciones
![alt text](image-17.png)

Pruebas de Buscar pedido por cliente 
![alt text](image-5.png)

Buscar por Filtros
![alt text](image-6.png)

Crear nuevo pedido modo claro 
![alt text](image-7.png)

Crear nuevo pedido con validaciones 
![alt text](image-8.png)

Crear pedido con un ID existente 
![alt text](image-23.png)

Agregar datos para crear nuevo pedido 
![alt text](image-9.png)

Pedido creado exitosamente 
![alt text](image-10.png)

Editar pedido 
![alt text](image-11.png)

Pedido actualizado exitosamente 
![alt text](image-12.png)

Eliminar un pedido 
![alt text](image-13.png)

Confirmacion de pedido eliminado correctamente 
![alt text](image-14.png)

Exportacion de pedidos a excel 
![alt text](image-15.png)

### ⚙️ Backend & API
Documentación interactiva y estructura de base de datos.
BACKEND API SWAGGER
Servicios
![alt text](image-18.png)

Servicio de Auth login 
![alt text](image-19.png)

Confirmacion de JWT Token 
![alt text](image-20.png)

Autorizacion Bearer JWT TOKEN 
![alt text](image-21.png)

Obtener todos los pedidos 
![alt text](image-22.png)

Crear pedido exitosamente
![alt text](image-27.png)
![alt text](image-28.png)

Crear pedido con id existente 
![alt text](image-24.png)

Buscar pedido por ID 
![alt text](image-29.png)

Actualizar pedido 
![alt text](image-30.png)

Eliminar pedido exitosamente 
![alt text](image-31.png)

Base de datos Postgres Tabla pedidos 
![alt text](image-25.png)

![Status](https://img.shields.io/badge/Status-Completed-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## 🏗️ Arquitectura y Stack Tecnológico

El proyecto está desacoplado en dos capas principales:

### 🔙 Backend (.NET 8)
Diseñado siguiendo **Clean Architecture** y **CQRS** para garantizar escalabilidad.

* **Core:**
    * **Domain:** Entidades ricas, Value Objects (`Money`), Enums y Reglas de Negocio puras.
    * **Application:** Patrón **CQRS** con **MediatR**. Manejo de casos de uso desacoplados.
* **Infrastructure:**
    * **Persistencia Híbrida:** **EF Core** para comandos (Escritura segura) y **Dapper** para consultas (Lectura rápida).
    * **Resiliencia:** Implementación de **Circuit Breaker** y **Retry Policies** con **Polly**.
* **Presentation (API):**
    * **Rate Limiting:** Protección nativa contra abuso de API.
    * **Seguridad:** Autenticación JWT Bearer y Hash de contraseñas.
    * **Middleware:** Manejo global de excepciones personalizado.

### 🎨 Frontend (React + Vite)
Arquitectura modular basada en **Vertical Slices (Features)**.

* **Gestión de Estado Servidor:** **TanStack Query v5** (Caching, Optimistic Updates).
* **Seguridad:** Interceptores Axios para inyección de Token y manejo de 401 (Auto-logout).
* **Calidad de Código:** Validaciones con Esquemas, Error Boundaries y Componentes Atómicos.
* **Estilos:** Tailwind CSS con diseño *Mobile First*.

---

## 📂 Estructura del Proyecto

### Backend Structure
```text
src/
├── 01. Presentation/
│   └── JRecinas.Acity.API/       # Controladores, Middleware, Program.cs
├── 02. Core/
│   ├── JRecinas.Acity.Application/ # CQRS (Handlers), DTOs, Interfaces
│   └── JRecinas.Acity.Domain/      # Entidades, Enums, Value Objects
└── 03. Infrastructure/
    └── JRecinas.Acity.Infrastructure/ # EF Core, Dapper, Repositorios

### Frontend Structure
 
```text
src/
├── config/       # Configuraciones globales (Axios, QueryClient)
├── core/         # Lógica de negocio agnóstica (Auth, HTTP Service)
├── features/     # Módulos funcionales (Auth, Pedidos)
├── routes/       # Definición de rutas y Guards
├── shared/       # Componentes UI reutilizables y utilidades
└── assets/       # Estilos globales y recursos estáticos

⚙️ Guía de Instalación y Ejecución
Prerrequisitos
.NET 8 SDK

Node.js (v18+)

PostgreSQL (Instancia local o Docker)

Paso 1: Configuración del Backend
Navega a la carpeta de la API:

Bash

cd Backend/src/01.Presentation/JRecinas.Acity.API
Configura tu cadena de conexión en appsettings.json:

JSON

"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=JRecinasAcityDb;Username=postgres;Password=tu_password"
}
Ejecuta la aplicación (El Seeder creará la BD y datos automáticamente):

Bash

dotnet run
API disponible en: https://localhost:7275 (o el puerto configurado).

Paso 2: Configuración del Frontend
Navega a la carpeta del cliente:

Bash

cd Frontend
Instala las dependencias:

Bash

npm install
Configura las variables de entorno en .env:

Fragmento de código

VITE_API_BASE_URL=https://localhost:7275/api
Inicia el servidor de desarrollo:

Bash

npm run dev
App disponible en: http://localhost:5173

🧪 Credenciales de Prueba (Data Seeder)
El backend incluye un Data Seeder que precarga un usuario administrador y pedidos de ejemplo al iniciar la aplicación por primera vez.

Email: admin@jrecinas.acity

Password: Admin123!
👤 Autor
JRecinas - Desarrollador Fullstack Senior .NET / React
