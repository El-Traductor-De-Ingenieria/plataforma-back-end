# Backend del Proyecto Plataforma v2
Hecho en NestJS.
Link del frontend del proyecto [aquí](https://github.com/El-Traductor-De-Ingenieria/plat-front).

# ¿Cómo ejecutar el proyecto en local?
### Requisitos
* `node` (16LTS o mayor)
* `mysql`
* `npm` (opcional, otros gestores de paquetes no están probados)

Como primer paso, instalas las dependencias del proyecto usando `npm i` (o equivalente). 

Luego, valiendote de la plantilla del archivo [.env.dev.example](https://github.com/StartForKillerMC/plataforma-back-end/blob/master/.env.dev.example), completas tu información en un archivo (creado por ti) llamado `.env.dev`. NestJS carga las variables de entorno de este archivo, así que no hay necesidad de instalar `dotenv`. El campo `SSL_CERT` es opcional. 

Para generar tus credenciales para el login con Discord puedes seguir [esta guía](https://discordjs.guide/oauth2/#getting-an-oauth2-url). NUNCA compartas estas credenciales. 

Si no tienes un usuario-contraseña de MySql, puedes ver [esta guía](https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html).

Luego, si todo sale bien, al correr el programa con `npm start` (o equivalente) podrás ver la documentación de la API desde tu navegador en `localhost:{puerto}/api/docs` (el puerto por defecto es `3000`). 

# Estructura Básica de Archivos
* dist/ - Archivos generados por NodeJS para funcionamiento.
* test/ - Unit testing.
* src/ - Código fuente.
  * auth/ - Autenticación de usuarios.
  * repository/ - Manejo de contenido subido por usuarios.
  * user/ - Manejo de usuarios.
  * utils/ - Herramientas y tipos comunes.
