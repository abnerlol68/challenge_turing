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

Después para activar el entorno virtual de python se ejecuta lo siguiente:

`./server/env/Scripts/activate`

Para instalar las dependencias que ocupa flask se necesita ejecutar el siguiente comando:

`pip install -r server/requirements.txt`

Y para poner en marcha el servidor:

`python server/src/index.py`

Ahora para correr el cliente (front):

`cd client/`

`npm i`

Para esta parte también se necesita un archivo .env

`touch client/.env`

`echo VITE_API=http://127.0.0.1:5000/api/ > .env`

Finalmente para arrancar el servidor de desarrollo

`npm run dev`
