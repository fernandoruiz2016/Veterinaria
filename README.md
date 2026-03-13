# Proyecto Veterinaria

Este repositorio es un proyecto para el examen parcial del curso Desarrollo de Interfaces 3.
Este es un sistema de gestión desarrollado con **Angular** diseñado para optimizar el control de citas, pacientes y propietarios en una clínica veterinaria. El proyecto implementa las mejores prácticas de desarrollo modular y seguridad en el frontend.

## Características Principales

* **Autenticación & Seguridad:**
    * Módulo de **Login** con validación de credenciales.
    * **AuthGuards** para proteger rutas privadas (solo accesibles tras iniciar sesión).
    * Persistencia de sesión mediante `localStorage`.
* **Gestión Integral (CRUD):**
    * **Mascotas:** Registro detallado de pacientes.
    * **Dueños:** Gestión de información de contacto de propietarios.
    * **Citas:** Programación y seguimiento de consultas médicas.
* **Arquitectura:**
    * Uso de **Servicios** para la lógica de negocio y comunicación de datos.
    * **Layout Modular** con componentes de navegación (Navbar, Sidebar) y contenedores de vista.


## Tecnologías Utilizadas

* **Framework:** Angular 20
* **Lenguaje:** TypeScript
* **Estilos:** CSS / Bootstrap.


## Estructura del Proyecto

```text
src/app/
├── core/
├── features/
│   ├── auth/            # Ventana de login
│   ├── citas/           # Ventana de citas
│   ├── duenos/          # Ventana de dueños
│   ├── home/            # Ventana de dashboard
│   └── mascotas/        # Ventana de mascotas
├── guards/              # Protección de rutas (AuthGuard)
├── models/              # Interfaces de citas, dueños y mascotas
├── services/            # Lógica central para citas, dashboard, dueños y mascotas
├── shared/
│   └── layout/          # Componentes globales (Header, Footer, Sidebar)
└── app-routing.module.ts# Configuración de rutas y guards
```

## Instalación y Uso

1. Clonar el repositorio:

```Bash
    git clone [https://github.com/fernandoruiz2016/Veterinaria]
```

2. Instalar dependencias:
```Bash
    npm install
```

3. Ejecutar el servidor local:
```Bash
    ng serve
```
4. Accede a http://localhost:4200 en tu navegador.

## Equipo de Desarrollo
Integrantes:
- Ruiz Yamamoto, Fernando Alonso
- Morillo Campos, Alexander Rafael
- Díaz Vilela, Jean Pierre