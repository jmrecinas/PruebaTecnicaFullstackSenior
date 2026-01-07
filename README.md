# 📦 Sistema de Gestión de Pedidos (Fullstack Senior)

<div align="center">

![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Architecture](https://img.shields.io/badge/Architecture-Clean%20%2B%20CQRS-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

> **Solución Integral al Reto Técnico.**
> Una aplicación empresarial robusta diseñada bajo estrictos estándares de **Arquitectura Limpia**, **Seguridad (JWT)**, **Resiliencia** y **UX Moderna**.

---

## 📖 Descripción General

Este proyecto implementa una solución completa (**End-to-End**) para la gestión de pedidos, demostrando competencias avanzadas en el desarrollo de software moderno. El objetivo principal es desacoplar la lógica de negocio de la infraestructura mediante una arquitectura por capas, asegurando escalabilidad, mantenibilidad y testabilidad.

### 🏗️ Arquitectura del Sistema

La solución sigue una **Clean Architecture** estricta, utilizando el patrón **CQRS** (Command Query Responsibility Segregation) para separar las operaciones de lectura y escritura.

![Arquitectura del Sistema](image_967f63.jpg)

| Capa | Responsabilidad | Tecnologías Clave |
| :--- | :--- | :--- |
| **Presentation** | Puntos de entrada (API REST) y manejo de excepciones global. | ASP.NET Core, Swagger, Rate Limiting |
| **Application** | Casos de uso y orquestación. Desacoplamiento total. | **MediatR**, CQRS, DTOs |
| **Domain** | Reglas de negocio, Entidades, Enums y Value Objects. | **DDD** (Rich Domain Model) |
| **Infrastructure** | Persistencia, servicios externos y adaptadores. | **EF Core** (Write), **Dapper** (Read), Polly |

---

## 📸 Galería y Funcionalidades

### 🎨 Frontend (React + Vite)
Interfaz moderna construida con **Tailwind CSS**, implementando una arquitectura basada en **Features** (Vertical Slices).

<details>
<summary><strong>👁️ Ver Capturas del Dashboard y Gestión (Clic aquí)</strong></summary>

| Dashboard (Dark/Light) | Gestión de Pedidos |
|:---:|:---:|
| ![Dashboard Dark](image-4.png) | ![Tabla Pedidos](image-26.png) |
| *Modo oscuro nativo y métricas* | *Listado paginado y filtrable* |

| Creación de Pedidos | Feedback Visual |
|:---:|:---:|
| ![Crear Pedido](image-16.png) | ![Validaciones](image-17.png) |
| *Formularios reactivos* | *Validación de esquemas (Zod/Yup)* |

| Filtros Avanzados | Exportación |
|:---:|:---:|
| ![Filtros](image-6.png) | ![Exportar Excel](image-15.png) |
| *Búsqueda en tiempo real* | *Reportes descargables* |

</details>

<details>
<summary><strong>🔐 Ver Capturas de Autenticación (Clic aquí)</strong></summary>

| Login Seguro | Validaciones |
|:---:|:---:|
| ![Login](image.png) | ![Error Login](image-1.png) |
| *Autenticación JWT* | *Manejo de errores visual* |

</details>

### ⚙️ Backend (API RESTful)
Documentación interactiva con Swagger y estructura de base de datos relacional.

<details>
<summary><strong>📡 Ver Capturas de la API y Base de Datos (Clic aquí)</strong></summary>

| Swagger Documentation | Auth & Seguridad |
|:---:|:---:|
| ![Swagger](image-18.png) | ![JWT Token](image-20.png) |
| *Documentación OpenAPI* | *Bearer Token Flow* |

| Endpoints CRUD | Persistencia |
|:---:|:---:|
| ![Endpoints](image-22.png) | ![Postgres Table](image-25.png) |
| *Operaciones REST completas* | *Esquema en PostgreSQL* |

</details>

### ⚙️ Backend (API RESTful & Swagger)
Documentación interactiva bajo estándar **OpenAPI 3.0**. La API implementa patrones de diseño robustos como *Response Wrappers* y *Global Exception Handling*.

<details open>
<summary><strong>📡 Documentación y Seguridad (Clic para contraer)</strong></summary>
<br>

| Servicios Disponibles | Seguridad (Bearer) |
|:---:|:---:|
| ![Swagger Home](image-18.png) | ![Authorize Modal](image-21.png) |
| *Vista general de Endpoints (Swagger UI)* | *Esquema de seguridad JWT Bearer* |

| Flujo de Autenticación | Respuesta de Token |
|:---:|:---:|
| ![Login Request](image-19.png) | ![JWT Response](image-20.png) |
| *Endpoint público de Login* | *Generación de Token con expiración* |

</details>

<details>
<summary><strong>🚀 Endpoints y Operaciones (Clic para expandir)</strong></summary>
<br>

| Listado de Pedidos (Query) | Búsqueda por ID |
|:---:|:---:|
| ![Get All](image-22.png) | ![Get By ID](image-29.png) |
| *Consulta optimizada (posiblemente Dapper)* | *Recuperación de detalle único* |

| Creación de Recurso | Respuesta Estandarizada |
|:---:|:---:|
| ![Create Request](image-27.png) | ![Create Success](image-28.png) |
| *DTO de entrada validado* | *Wrapper `BaseResponse<T>` (Clean Architecture)* |

| Manejo de Errores | Actualización (Command) |
|:---:|:---:|
| ![Error Duplicado](image-24.png) | ![Update Request](image-32.png) |
| *Middleware capturando reglas de negocio* | *Modificación segura de recursos* |

</details>

---

## 🚀 Características Técnicas Destacadas

### Backend (.NET 8)
* ✅ **CQRS con MediatR:** Separación clara entre Comandos (Modifican estado) y Queries (Leen estado).
* ✅ **Persistencia Híbrida:** * **EF Core:** Para escritura segura y manejo de transacciones (`UnitOfWork`).
    * **Dapper:** Para consultas de lectura de alto rendimiento (Micro-ORM).
* ✅ **Resiliencia:** Implementación de **Circuit Breaker** y **Retry Policies** con **Polly**.
* ✅ **Seguridad:** Autenticación JWT y Hash de contraseñas.
* ✅ **Rate Limiting:** Protección nativa contra abuso de API.

### Frontend (React 18)
* ✅ **Gestión de Estado Servidor:** Uso de **TanStack Query v5** para caching y actualizaciones optimistas.
* ✅ **Arquitectura Modular:** Estructura de carpetas basada en funcionalidades (`features/auth`, `features/pedidos`) en lugar de tipos técnicos.
* ✅ **Seguridad:** Interceptores Axios para inyección automática de tokens y manejo de errores 401 (Auto-logout).
* ✅ **UI/UX:** Diseño responsivo *Mobile-First* con Feedback inmediato (Toasts, Loaders).

---

## 📂 Estructura del Proyecto

```text
<<<<<<< HEAD
/
├── 📂 Backend/
│   ├── 📂 src/
│   │   ├── 📂 01. Presentation/ (API, Middleware, Config)
│   │   ├── 📂 02. Core/         (Domain Entities, CQRS Handlers, Interfaces)
│   │   └── 📂 03. Infrastructure/ (EF Core, Dapper Repositories, Services)
│
├── 📂 Frontend/
│   ├── 📂 src/
│   │   ├── 📂 config/       # Configuración global (Axios)
│   │   ├── 📂 features/     # Módulos funcionales (Auth, Pedidos)
│   │   ├── 📂 core/         # Hooks y servicios base
│   │   ├── 📂 shared/       # Componentes UI reutilizables
│   │   └── 📂 routes/       # Guards y Router
=======
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

## ⚙️ Guía de Instalación y Despliegue

### Prerrequisitos
* [.NET 8 SDK](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/) (v18+)
* [PostgreSQL](https://www.postgresql.org/) (Local )

### 1️⃣ Configuración del Backend

1.  Navega a la carpeta de la API:
    ```bash
    cd Backend/src/01.Presentation/JRecinas.Acity.API
    ```
2.  Configura tu cadena de conexión en `appsettings.json`:
    ```json
    "ConnectionStrings": {
      "DefaultConnection": "Host=localhost;Port=5432;Database=JRecinasAcityDb;Username=postgres;Password=tu_password"
    }
    ```
3.  Ejecuta la aplicación (**El Seeder creará la BD y datos automáticamente**):
    ```bash
    dotnet run
    ```
    *API disponible en: `https://localhost:7275`*

### 2️⃣ Configuración del Frontend

1.  Navega a la carpeta del cliente:
    ```bash
    cd Frontend
    ```
2.  Instala las dependencias e inicia:
    ```bash
    npm install
    npm run dev
    ```
3.  Configura las variables de entorno en `.env`:
    ```env
    VITE_API_BASE_URL=https://localhost:7275/api
    ```

---

## 🧪 Credenciales de Prueba (Data Seeder)

El backend incluye un **Data Seeder** que precarga un usuario administrador y pedidos de ejemplo al iniciar la aplicación por primera vez.

| Rol | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@jrecinas.acity` | `Admin123!` |

---

## 👤 Autor

**JRecinas**
*Desarrollador Fullstack Senior .NET / React*
