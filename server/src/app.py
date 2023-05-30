from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from routes.selects import select
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app, origins=os.getenv('ORIGINS'))
conexion = MySQL(app)

app.register_blueprint(select)
