# Server Node API REST
Servidor realizado con Node, Express y base de datos MySql. 

## 📋 Instrucciones:
- Instalar nodemon de manera global para poder ejecutar el script _dev_ para observar cambios mientras guardas.
- Si no deseas usar nodemon, podés correr el script _start_, así funciona sólo con node.
- Adicionar un archivo .env con las instrucciones que te envíe más tarde.
- Crear una base de datos MySql en local.

Al correr el server, automáticamente creará las tablas necesarias en la DB.

Para probar que todo funciona correr: <http://localhost:5000/api>

La lista de Endpoints está en la documentación de Insomnia que te pasaré anexo.

## 🔐 Autenticación:
Bearer con JWT token enviado en Authorization Header

## ✔ Principales Endpoints:
- Login POST: <http://localhost:5000/api/auth/authenticate>
- Registrarse POST: <http://localhost:5000/api/user/register>
- Cualquier colleción /items/COLLECIÓN GET: <http://localhost:5000/api/items/articles>

## 📌 Stack

- Node
- Express
- MySql
- JWT
- Sequelize

## 🌟 Autor

**Mailer Martínez Ballesta** - [@hispanos](https://github.com/hispanos)
