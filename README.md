# Turing Fase de prueba

### Set-up del proyecto

**Requisitos**

- NODE
- NPM
- Python3
- pip
- virtualenv
- MySQL
- Postman

Despliegue de la base de datos:

`mysql -u <user> -p < db/script.sql `

En el funcionamiento de la API se ocupan variables de entorno que deben ser colocadas en el archivo `server/src/.env`, las variables que se ocupan son las siguientes:

```
MYSQL_HOST=<host>

MYSQL_USER=<user>

MYSQL_PASSWORD=<pass>

MYSQL_DB=turing

DEBUG=True

ORIGINS=http(s)?://localhost(:[0-9]+)?
```

Dentro de la carpeta `server/` se debe crear el entorno virtual del servidor mediante el siguiente comando:

`python -m virtualenv env`
