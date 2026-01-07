# 📦 Sistema de Gestión de Pedidos (Fullstack Senior)

<div align="center">

![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Architecture](https://img.shields.io/badge/Architecture-Clean%20%2B%20CQRS-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

</div>

> **Solución Integral al Reto Técnico.**
> Una aplicación empresarial robusta diseñada bajo estrictos estándares de **Arquitectura Limpia**, **Seguridad (JWT)**, **Resiliencia** y **UX Moderna**.

---

## 📖 Descripción General

Este proyecto implementa una solución completa para la gestión de pedidos, demostrando competencias avanzadas en el desarrollo de software moderno. El objetivo principal es desacoplar la lógica de negocio de la infraestructura mediante una arquitectura por capas, asegurando escalabilidad, mantenibilidad y testabilidad.

### 🏗️ Arquitectura del Sistema

La solución sigue una **Clean Architecture** estricta, utilizando el patrón **CQRS** (Command Query Responsibility Segregation) para separar las operaciones de lectura y escritura.

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
<summary><strong>🔐 1. Autenticación y Seguridad (Clic para ver)</strong></summary>
<br>

| Login Screen | Validaciones de Formulario |
|:---:|:---:|
| ![Login](image.png) | ![Validaciones](image-1.png) |
| *Diseño limpio con validación de credenciales* | *Feedback visual inmediato (Yup/Zod)* |

| Ingreso de Credenciales | Acceso Exitoso |
|:---:|:---:|
| ![Ingreso](image-2.png) | ![Modal Success](image-3.png) |
| *Interacción fluida* | *Redirección segura tras autenticación* |

</details>

<details open>
<summary><strong>📊 2. Dashboard y Gestión (Clic para ver)</strong></summary>
<br>

| Dashboard (Light Mode) | Dashboard (Dark Mode) |
|:---:|:---:|
| ![Light Mode](image-26.png) | ![Dark Mode](image-4.png) |
| *Vista clara de métricas y tablas* | *Soporte nativo para modo oscuro* |

| Búsqueda y Filtros | Exportación de Datos |
|:---:|:---:|
| ![Busqueda](image-5.png) | ![Excel Export](image-15.png) |
| *Búsqueda por Cliente/ID* | *Generación de reportes .xlsx* |

</details>

<details>
<summary><strong>📝 3. Operaciones CRUD (Clic para ver)</strong></summary>
<br>

| Creación (Light) | Validaciones (Light) |
|:---:|:---:|
| ![Create Light](image-7.png) | ![Validation Light](image-8.png) |

| Creación (Dark) | Validaciones (Dark) |
|:---:|:---:|
| ![Create Dark](image-16.png) | ![Validation Dark](image-17.png) |

| Lógica de Negocio | Feedback de Éxito |
|:---:|:---:|
| ![ID Existente](image-23.png) | ![Success Create](image-10.png) |
| *Control de duplicidad de IDs* | *Notificaciones Toast no intrusivas* |

| Edición de Pedido | Eliminación Segura |
|:---:|:---:|
| ![Edit](image-11.png) | ![Delete Modal](image-13.png) |
| *Carga de datos existentes* | *Modal de confirmación (Soft Delete)* |

</details>

---

### ⚙️ Backend & Base de Datos
API RESTful documentada bajo estándar **OpenAPI 3.0** y persistencia en **PostgreSQL**.

<details>
<summary><strong>📡 Documentación API (Swagger) - Clic para ver</strong></summary>
<br>

| Servicios Disponibles | Seguridad (Bearer) |
|:---:|:---:|
| ![Swagger Home](image-18.png) | ![Authorize](image-21.png) |
| *Vista general de Endpoints* | *Esquema de seguridad JWT* |

| Flujo de Login | Token JWT |
|:---:|:---:|
| ![Login Endpoint](image-19.png) | ![Token Response](image-20.png) |
| *Request de credenciales* | *Generación de Token seguro* |

</details>

<details>
<summary><strong>🚀 Endpoints y Pruebas - Clic para ver</strong></summary>
<br>

| Listar Pedidos | Buscar por ID |
|:---:|:---:|
| ![Get All](image-22.png) | ![Get ID](image-29.png) |

| Crear Pedido | Respuesta Exitosa |
|:---:|:---:|
| ![Create Req](image-27.png) | ![Create Res](image-28.png) |

| Manejo de Errores | Actualización (PUT) |
|:---:|:---:|
| ![Error ID](image-24.png) | ![Update](image-30.png) |
| *Error 400 por ID existente* | *Actualización de estado/monto* |

| Eliminación (DELETE) | Persistencia (PostgreSQL) |
|:---:|:---:|
| ![Delete](image-31.png) | ![DB Table](image-25.png) |
| *Soft Delete implementado* | *Tabla física en pgAdmin* |

</details>

---

## 🚀 Características Técnicas Destacadas

### Backend (.NET 8)
* ✅ **CQRS con MediatR:** Separación clara entre Comandos (Escritura) y Queries (Lectura).
* ✅ **Persistencia Híbrida:** **EF Core** para consistencia y **Dapper** para velocidad.
* ✅ **Resiliencia:** Implementación de **Circuit Breaker** y **Retry Policies** con Polly.
* ✅ **Seguridad:** Autenticación JWT y Hash de contraseñas.
* ✅ **Rate Limiting:** Protección nativa contra abuso de API.

### Frontend (React 18)
* ✅ **Estado Servidor:** Uso de **TanStack Query v5** para caching y actualizaciones optimistas.
* ✅ **Arquitectura Modular:** Estructura basada en *Vertical Slices* (`features/auth`, `features/pedidos`).
* ✅ **Seguridad:** Interceptores Axios para inyección de tokens y manejo de sesión (401).
* ✅ **UI/UX:** Diseño *Mobile-First* con Tailwind CSS y feedback inmediato.

---

## ⚙️ Guía de Instalación y Despliegue

### Prerrequisitos
* [.NET 8 SDK](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/) (v18+)
* [PostgreSQL](https://www.postgresql.org/) (Local o Docker)

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
