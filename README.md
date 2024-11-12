
## Description
# Proyecto NestJS

Este es un proyecto desarrollado con **NestJS** que incluye módulos de autenticación, gestión de usuarios y tareas, así como un interceptor para formatear las respuestas.

## Características
- **NestJS**: Framework backend rápido y eficiente.
- **Autenticación**: Módulo para manejar la autenticación de usuarios.
- **Gestión de Usuarios**: CRUD para usuarios.
- **Gestión de Tareas**: CRUD para tareas.
- **Interceptor**: Formateo de respuestas uniformes.

## Requisitos Previos
Asegúrate de tener instalados los siguientes programas antes de empezar:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [Nest CLI](https://docs.nestjs.com/cli/overview) (opcional, pero recomendado)

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd nombre-del-proyecto
npm install

## Configuración
Crea un archivo .env con las siguientes variables 

PORT=3000
DATABASE_URL=mongodb://localhost:27017/tu_base_de_datos
JWT_SECRET=tu_secreto_jwt


## Compila y Ejecuta el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```


Endpoints Principales
Autenticación
POST /auth/login - Inicia sesión con credenciales.
POST /auth/register - Registra un nuevo usuario.
Usuarios
GET /users - Obtiene todos los usuarios.
GET /users/:id - Obtiene un usuario por ID.
PATCH /users/:id - Actualiza un usuario por ID.
DELETE /users/:id - Elimina un usuario por ID.
Tareas
GET /tasks - Obtiene todas las tareas.
POST /tasks - Crea una nueva tarea.
PATCH /tasks/:id - Actualiza una tarea por ID.
DELETE /tasks/:id - Elimina una tarea por ID.

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
